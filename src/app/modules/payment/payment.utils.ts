import { randomString } from "../../utils/randomString";
import { Payment } from "./payment.model";

export const generateUniqueOrderId = async (): Promise<string> => {
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const orderId = `SEE-${randomString(10)}`;

    const exists = await Payment.exists({ orderId });

    if (!exists) {
      return orderId;
    }
  }

  throw new Error("Unable to generate unique order ID.");
};