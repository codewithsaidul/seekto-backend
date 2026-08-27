/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";
import { TNext, TRequest, TResponse } from "../../types/global";

export const PaymentController = {
  initiatePayment: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const { donationId } = req.body;

    const result = await PaymentService.initiatePayment(
      donationId,
      req.ip || "127.0.0.1",
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Payment initiated successfully",
      data: result,
    });
  }),


   /**
   * Verify payment manually
   * Called after user returns from ShurjoPay
   */
  verifyPayment: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const { spOrderId } = req.params;

    const result = await PaymentService.verifyPayment(spOrderId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  }),

  /**
   * ShurjoPay IPN / Payment Status Update
   */
  handleIPN: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const { sp_order_id } = req.query;


    const result = await PaymentService.handleIPN(sp_order_id as string);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Payment status updated successfully",
      data: result,
    });
  }),

};