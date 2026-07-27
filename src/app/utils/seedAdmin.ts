/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IUser, UserRole, UserStatus } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({ role: UserRole.ADMIN });

    if (isAdminExist) {
      console.log("Admin already exists.",);
      return null;
    }


    const AdminInfo: IUser = {
      name: "Seekto - Admin",
      email: envVars.ADMIN_EMAIL,
      password: envVars.ADMIN_PASSWORD,
      location: "Headquarters",
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      isDeleted: false,
    };

    await User.create(AdminInfo);

    console.log("Admin seeded successfully.");
  } catch (error) {
    console.log(error);
  }
};
