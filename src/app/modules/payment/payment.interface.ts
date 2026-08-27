import { Types } from "mongoose";

export enum PaymentStatus {
  INITIATED = "initiated",
  SUCCESS = "success",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum PaymentProvider {
  SHURJOPAY = "shurjopay",
}

export interface IPayment {
  _id?: Types.ObjectId;

  donation: Types.ObjectId;

  orderId: string;
  providerOrderId?: string;

  provider: PaymentProvider;

  amount: number;
  currency: string;

  status: PaymentStatus;

  paymentMethod?: string;
  transactionId?: string;

  customerName: string;
  customerEmail: string;
  customerPhone?: string;

  initiatedAt?: Date;
  completedAt?: Date;

  // Gateway responses
  initiationResponse?: unknown;
  verificationResponse?: unknown;

  createdAt?: Date;
  updatedAt?: Date;
}