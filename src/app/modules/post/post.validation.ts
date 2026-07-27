import { z } from "zod";
import { PostStatus } from "./post.interface";

export const createPostZodSchema = z.object({
      title: z
        .string({ error: "Title is required" })
        .min(3, "Title must be at least 3 characters long")
        .trim(),

      content: z
        .string({ error: "Content is required" })
        .min(10, "Content must be at least 10 characters long"),

      excerpt: z.string().trim().optional(),

      slug: z.string().trim().optional(),

      images: z
        .string()
        .url("Must be a valid image URL")
        .optional()
        .or(z.literal("")),

      category: z
        .string({ error: "Category is required" })
        .min(2, "Category must be at least 2 characters")
        .trim(),

      author: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format")
        .optional(),

      tags: z
        .array(z.string().min(1, "Tag cannot be empty"))
        .nonempty("At least one tag is required"),

      status: z
        .enum([...Object.values(PostStatus)], {
          error: "Status is required",
        })
        .default(PostStatus.DRAFT),

      views: z
        .number()
        .int("Views must be an integer")
        .min(0, "Views cannot be negative")
        .optional()
        .default(0),

      likes: z
        .number()
        .int("Likes must be an integer")
        .min(0, "Likes cannot be negative")
        .optional()
        .default(0),

      targetAmount: z
        .number()
        .min(0, "Target amount cannot be negative")
        .optional(),

      raisedAmount: z
        .number()
        .min(0, "Raised amount cannot be negative")
        .optional()
        .default(0),
    })
    .superRefine((data, ctx) => {
      if (data.status === "published" && data.content.length < 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Published posts must have at least 50 characters of content",
          path: ["content"],
        });
      }
});


export const updatePostZodSchema = z.object({
    title: z.string().min(3).trim().optional(),
    content: z.string().min(10).optional(),
    excerpt: z.string().trim().optional(),
    slug: z.string().trim().optional(),
    images: z.string().url().optional().or(z.literal("")),
    category: z.string().min(2).trim().optional(),
    tags: z.array(z.string().min(1)).optional(),
    status: z.enum(["draft", "published", "archived"]).optional(),
    targetAmount: z.number().min(0).optional(),
    raisedAmount: z.number().min(0).optional(),
});


