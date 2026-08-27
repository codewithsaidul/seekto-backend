import { Schema, model } from "mongoose";
import {
  IPayment,
  PaymentProvider,
  PaymentStatus,
} from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    donation: {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    providerOrderId: {
      type: String,
    },

    provider: {
      type: String,
      enum: Object.values(PaymentProvider),
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "BDT",
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.INITIATED,
    },

    paymentMethod: {
      type: String,
    },

    transactionId: {
      type: String,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
    },

    initiatedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    initiationResponse: {
      type: Schema.Types.Mixed,
    },

    verificationResponse: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<IPayment>("Payment", paymentSchema);