import { Types } from "mongoose";
import { generateExcerpt } from "../../utils/generateExcerpt";
import { slugifyUnique } from "../../utils/slugify";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { PostRepository } from "./post.repository";
import { AppError } from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";

export const PostServices = {
  createPost: async (payload: IPost, userId: string) => {
    const uniqueSlug = await slugifyUnique([payload.title as string], Post, 50);

    const excerpt =
      payload.excerpt || generateExcerpt(payload.content || "", 100);

    const postData: Partial<IPost> = {
      ...payload,
      slug: uniqueSlug,
      excerpt: excerpt,
      author: new Types.ObjectId(userId),
      status: payload.status || "published",
    };

    const post = await PostRepository.createPost(postData);
    return post;
  },

  getAllPost: async (query: Record<string, string>) => {
    const { data, meta } = await PostRepository.getAllPosts(query);
    return { data, meta };
  },

  getPostDetailsBySlug: async (slug: string) => {
    const post = await PostRepository.getPostDetailsBySlug(slug);
    if (!post) {
      throw new AppError(StatusCodes.NOT_FOUND, "Post not found.");
    }

    return post;
  },

  updatePostById: async (postId: string, updateData: Partial<IPost>) => {
    const post = await PostRepository.findByPostId(postId);
    if (!post) {
      throw new AppError(StatusCodes.NOT_FOUND, "Post not found.");
    }
    return await PostRepository.updatePostById(postId, updateData);
  },

  softDeletePostByIds: async (postIds: string[]) => {
    // Empty array check
    if (postIds.length === 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Post IDs are required.");
    }
    const posts = await PostRepository.findByPostIds(postIds);

    // No post found
    if (posts.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, "No posts found.");
    }

    // Some IDs are invalid
    if (posts.length !== postIds.length) {
      const foundIds = new Set(posts.map((post) => post._id.toString()));

      const missingIds = postIds.filter((id) => !foundIds.has(id));

      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Posts not found: ${missingIds.join(", ")}`,
      );
    }

    return await PostRepository.softDeleteByIds(postIds);
  },

  permanentDeletePostByIds: async (postIds: string[]) => {
    // Empty array check
    if (postIds.length === 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Post IDs are required.");
    }
    const posts = await PostRepository.findByPostIds(postIds);

    // No post found
    if (posts.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, "No posts found.");
    }

    // Some IDs are invalid
    if (posts.length !== postIds.length) {
      const foundIds = new Set(posts.map((post) => post._id.toString()));

      const missingIds = postIds.filter((id) => !foundIds.has(id));

      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Posts not found: ${missingIds.join(", ")}`,
      );
    }

    return await PostRepository.permanentDeletePostByIds(postIds);
  },
};
