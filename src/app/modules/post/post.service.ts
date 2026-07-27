import { Types } from "mongoose";
import { generateExcerpt } from "../../utils/generateExcerpt";
import { slugifyUnique } from "../../utils/slugify";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { PostRepository } from "./post.repository";

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
};
