import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post(
  "/initiate",
  PaymentController.initiatePayment,
);

router.post(
  "/verify/:providerOrderId",
  PaymentController.verifyPayment,
);

router.post(
  "/ipn",
  PaymentController.handleIPN,
);

export const PaymentRoutes = router;