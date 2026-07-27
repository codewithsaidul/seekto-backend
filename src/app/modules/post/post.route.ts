import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { multerUpload } from "../../config/multer.config";
import { UserRole } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createPostZodSchema } from "./post.validation";
import { PostController } from "./post.controller";


const router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("file"),
  validateRequest(createPostZodSchema),
  PostController.createPost
);