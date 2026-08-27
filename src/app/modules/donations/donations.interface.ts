import { Types } from "mongoose";

export interface IDonation {
  _id?: Types.ObjectId;

  donorName: string;
  donorEmail: string;
  donorPhone?: string;

  amount: number;
  currency: string;

  message?: string;


  post?: Types.ObjectId;

  status: DonationStatus;

  payment?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export enum DonationStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}