import { DonationRepository } from "../donations/donations.repository";
import { PaymentRepository } from "./payment.repository";
import { PaymentProvider, PaymentStatus } from "./payment.interface";
import { PaymentGateway } from "./payment.provider";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errorHelpers/AppError";
import { generateUniqueOrderId } from "./payment.utils";

export const PaymentService = {
  initiatePayment: async (donationId: string, clientIp: string) => {
    const donation = await DonationRepository.findDonationById(donationId);

    if (!donation) {
      throw new Error("Donation not found");
    }

    const orderId = await generateUniqueOrderId();

    const payment = await PaymentRepository.createPayment({
      donation: donation._id,
      orderId,

      provider: PaymentProvider.SHURJOPAY,

      amount: donation.amount,
      currency: donation.currency,

      status: PaymentStatus.INITIATED,

      customerName: donation.donorName,
      customerEmail: donation.donorEmail,
      customerPhone: donation.donorPhone,

      initiatedAt: new Date(),
    });

    const auth = await PaymentGateway.getAuthToken();

    const response = await PaymentGateway.createPayment(
      auth.token,
      auth.store_id,
      {
        orderId,
        amount: donation.amount,
        customerName: donation.donorName,
        customerEmail: donation.donorEmail,
        customerPhone: donation.donorPhone,
        clientIp,
      },
    );

    await PaymentRepository.updatePayment(payment._id.toString(), {
      providerOrderId: response.sp_order_id,
      initiationResponse: response,
    });

    return response;
  },

  // ============================================
  // COMMON VERIFY + UPDATE
  // ============================================

  verifyAndUpdatePayment: async (providerOrderId: string) => {
    // 1. Get ShurjoPay authentication token
    const auth = await PaymentGateway.getAuthToken();

    // 2. Verify payment directly with ShurjoPay
    const response = await PaymentGateway.verifyPayment(
      auth.token,
      providerOrderId,
    );

    if (!response) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Unable to verify payment.");
    }

    // 3. Determine internal payment status
    let status: PaymentStatus;

    if (
      Number(response.sp_code) === 1000 ||
      response.transaction_status?.toLowerCase() === "completed"
    ) {
      status = PaymentStatus.SUCCESS;
    } else if (response.transaction_status?.toLowerCase() === "cancelled") {
      status = PaymentStatus.CANCELLED;
    } else {
      status = PaymentStatus.FAILED;
    }

    // 4. Update our payment record
    const updatedPayment = await PaymentRepository.updateByProviderOrderId(
      providerOrderId,
      {
        status,

        amount: response.amount,
        currency: response.currency,

        transactionId: response.sp_trxn_id,

        paymentMethod: response.method,

        verificationResponse: response,

        ...(status === PaymentStatus.SUCCESS && {
          completedAt: new Date(),
        }),
      },
    );

    if (!updatedPayment) {
      throw new AppError(StatusCodes.NOT_FOUND, "Payment record not found.");
    }

    return {
      payment: updatedPayment,
      gatewayResponse: response,
    };
  },

  // ============================================
  // VERIFY PAYMENT
  // ============================================

  verifyPayment: async (providerOrderId: string) => {
    const result = await PaymentService.verifyAndUpdatePayment(providerOrderId);

    const response = result.gatewayResponse;

    // ShurjoPay verification failed
    if (response.sp_code !== undefined && Number(response.sp_code) !== 1000) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        response.sp_message || "Payment verification failed.",
      );
    }

    return result;
  },

  // ============================================
  // HANDLE IPN
  // ============================================

  handleIPN: async (providerOrderId: string) => {
    /**
     * IPN request itself is NOT trusted.
     *
     * We receive providerOrderId from ShurjoPay,
     * then verify the transaction directly
     * with ShurjoPay before updating our database.
     */

    if (!providerOrderId || typeof providerOrderId !== "string") {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid providerOrderId in IPN request.",
      ); 
    }

    return PaymentService.verifyAndUpdatePayment(providerOrderId);
  },
};
