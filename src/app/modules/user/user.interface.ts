import { Model } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  HOST = "host",
  USER = "user"
}

export enum UserStatus {
  PENDING = "pending",
  BLOCKED = "blocked",
  ACTIVE = "active"
}


export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  location: string;
  role?: UserRole;
  status?: UserStatus;
  isPasswordResetTokenUsed?: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}