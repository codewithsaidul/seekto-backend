import { Schema, model } from "mongoose";
import { DonationStatus, IDonation } from "./donations.interface";

const donationSchema = new Schema<IDonation>(
  {
    donorName: {
      type: String,
      required: [true, "Donor name is required"],
      trim: true,
    },

    donorEmail: {
      type: String,
      required: [true, "Donor email is required"],
      lowercase: true,
      trim: true,
    },

    donorPhone: {
      type: String,
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Donation amount is required"],
      min: [1, "Donation amount must be greater than 0"],
    },

    currency: {
      type: String,
      default: "BDT",
    },

    message: {
      type: String,
      trim: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },

    status: {
      type: String,
      enum: Object.values(DonationStatus),
      default: DonationStatus.PENDING,
    },

    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Donation = model<IDonation>("Donation", donationSchema);