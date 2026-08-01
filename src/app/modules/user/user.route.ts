import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserController } from "./user.controller";
import { UserRole } from "./user.interface";

const router = Router();

router.get("/", checkAuth(UserRole.ADMIN), UserController.getAllUsers);
router.get(
  "/me",
  checkAuth(...Object.values(UserRole)),
  UserController.getUserProfile,
);

router.delete("/:userId", checkAuth(UserRole.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
