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

router.get("/", PostController.getAllPost);

router.get("/:slug", PostController.getPostDetailsBySlug);

router.patch(
  "/:postId",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("file"),
  PostController.updatePostById
);

router.delete(
  "/",
  checkAuth(UserRole.ADMIN),
  PostController.softDeletePostByIds
);


router.delete(
  "/permanent",
  checkAuth(UserRole.ADMIN),
  PostController.permanentDeletePostByIds
);