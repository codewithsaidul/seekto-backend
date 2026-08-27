import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";

export const PaymentRepository = {
  // Create payment
  createPayment: async (data: Partial<IPayment>) => {
    return Payment.create(data);
  },

  // Find by our internal order ID
  findByOrderId: async (orderId: string) => {
    return Payment.findOne({ orderId });
  },

  // Find by ShurjoPay/provider order ID
  findByProviderOrderId: async (providerOrderId: string) => {
    return Payment.findOne({ providerOrderId });
  },

  // Update by MongoDB ID
  updatePayment: async (
    paymentId: string,
    data: Partial<IPayment>,
  ) => {
    return Payment.findByIdAndUpdate(
      paymentId,
      { $set: data },
      {
        new: true,
        runValidators: true,
      },
    );
  },

  // Update by provider order ID
  updateByProviderOrderId: async (
    providerOrderId: string,
    data: Partial<IPayment>,
  ) => {
    return Payment.findOneAndUpdate(
      { providerOrderId },
      { $set: data },
      {
        new: true,
        runValidators: true,
      },
    );
  },
};