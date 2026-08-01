import { QueryBuilder } from "../../utils/queryBuilder";
import { userSearchableFields } from "./user.constants";
import { UserRole } from "./user.interface";
import { User } from "./user.model";

export const UserRepository = {
  getAllUsers: async (query: Record<string, unknown>) => {
    const usersQueryBuilder = new QueryBuilder(
      User.find({
        isDeleted: false,
      }),
      query,
    )
      .search(userSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const [data, meta] = await Promise.all([
      usersQueryBuilder
        .build()
        .select("-password -auths -isPasswordResetTokenUsed"),
      usersQueryBuilder.getMeta(),
    ]);


    return {
      data,
      meta,
    };
  },

  findByUserId: async (userId: string) => {
    const user = await User.findById(userId);

    return user;
  },

  countActiveAdmins: async () => {
    return User.countDocuments({
      role: UserRole.ADMIN,
      isDeleted: false,
    });
  },

  softDeleteById: async (userId: string) => {
    return User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
  },
};
