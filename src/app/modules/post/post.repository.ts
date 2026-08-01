import { QueryBuilder } from "../../utils/queryBuilder";
import { postSearchableFields } from "./post.constants";
import { IPost } from "./post.interface";
import { Post } from "./post.model";

export const PostRepository = {
  createPost: async (postData: Partial<IPost>) => {
    const post = await Post.create(postData);
    return post;
  },

  getAllPosts: async (query: Record<string, string>) => {
    const postQueryBuilder = new QueryBuilder(
      Post.find({
        isDeleted: false,
      }),
      query,
    )
      .search(postSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const [data, meta] = await Promise.all([
      postQueryBuilder.build(),
      postQueryBuilder.getMeta(),
    ]);

    return {
      data,
      meta,
    };
  },

  getPostDetailsBySlug: async (slug: string) => {
    const post = await Post.findOne({ slug, isDeleted: false }).populate(
      "author",
      "-password -isPasswordResetTokenUsed",
    );
    return post;
  },

  findByPostId: async (postId: string) => {
    return await Post.findById(postId);
  },
  findByPostIds: async (postIds: string[]) => {
    return await Post.find({ _id: { $in: postIds } });
  },

  updatePostById: async (postId: string, updateData: Partial<IPost>) => {
    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });
    return updatedPost;
  },

  softDeleteByIds: async (postIds: string[]) => {
    return Post.updateMany(
      {
        _id: { $in: postIds },
      },
      {
        $set: {
          isDeleted: true,
        },
      },
    );
  },

  permanentDeletePostByIds: async (postIds: string[]) => {
    return Post.deleteMany({ _id: { $in: postIds } });
  },
};
