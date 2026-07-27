import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { AuthController } from "./auth.controller";

const router = Router();


router.post("/login", AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);


router.get(
  "/me",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  AuthController.getMe
);


export const AuthRoutes = router;
