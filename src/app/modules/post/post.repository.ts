import { IPost } from "./post.interface";
import { Post } from "./post.model";

export const PostRepository = {
  createPost: async (postData: Partial<IPost>) => {
    const post = await Post.create(postData);
    return post;
  },
};
