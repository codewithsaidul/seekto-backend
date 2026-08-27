import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createDonationZodSchema } from "./donations.validation";
import { DonationController } from "./donations.controller";

const router = Router();

router.post(
  "/",
  validateRequest(createDonationZodSchema),
  DonationController.createDonation,
);

export const DonationsRoutes = router;