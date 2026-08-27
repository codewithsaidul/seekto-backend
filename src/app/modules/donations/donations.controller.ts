/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { TNext, TRequest, TResponse } from "../../types/global";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DonationService } from "./donations.service";

export const DonationController = {
  createDonation: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const donation =
      await DonationService.createDonation(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Donation created successfully",
      data: donation,
    });
  }),
};