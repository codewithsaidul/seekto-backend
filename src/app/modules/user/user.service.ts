import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errorHelpers/AppError";
import { UserRole, UserStatus } from "./user.interface";
import { UserRepository } from "./userrepository";

export const UserService = {
  getAllUsers: async (query: Record<string, unknown>) => {
    const { data, meta } = await UserRepository.getAllUsers(query);

    return {
      data,
      meta,
    };
  },

  getUserProfile: async (userId: string) => {
    const user = await UserRepository.findByUserId(userId);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    if (user.isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, "User is deleted");
    }
    if (user.status === UserStatus.BLOCKED) {
      throw new AppError(StatusCodes.FORBIDDEN, "User is blocked");
    }

    return user;
  },

  deleteUser: async (userId: string, currentUserRole: string) => {
    const userToDelete = await UserRepository.findByUserId(userId);

    if (!userToDelete) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    if (
      userToDelete.role === UserRole.ADMIN &&
      currentUserRole !== UserRole.ADMIN
    ) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "Access Denied! Only a Admin can delete another Admin.",
      );
    }

    if (userToDelete.role === UserRole.ADMIN) {
      const activeADMINCount = await UserRepository.countActiveAdmins()

      if (activeADMINCount <= 1) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "Operation Blocked! You cannot delete the only remaining Admin.",
        );
      }
    }

    
    await UserRepository.softDeleteById(userId);

    return null;
  },
};
