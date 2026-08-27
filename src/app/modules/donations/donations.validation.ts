import { z } from "zod";

export const createDonationZodSchema = z.object({
  donorName: z
    .string()
    .min(2, "Donor name must be at least 2 characters")
    .trim(),

  donorEmail: z
    .string()
    .email("Invalid email address")
    .trim(),

  donorPhone: z
    .string()
    .optional(),

  amount: z
    .number()
    .positive("Donation amount must be greater than 0"),

  currency: z
    .string()
    .default("BDT"),

  message: z
    .string()
    .max(500, "Message cannot exceed 500 characters")
    .optional(),

  post: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID")
    .optional(),
});