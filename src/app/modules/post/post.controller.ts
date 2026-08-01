/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { TNext, TRequest, TResponse } from "../../types/global";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IPost } from "./post.interface";
import { JwtPayload } from "jsonwebtoken";
import { PostServices } from "./post.service";

export const PostController = {
  createPost: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const payload: IPost = {
      ...req.body,
      image: req?.file?.path,
    };

    const { userId } = req.user as JwtPayload;
    const post = await PostServices.createPost(payload, userId);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Post created successfully",
      data: post,
    });
  }),

  getAllPost: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const post = await PostServices.getAllPost(
      req.query as Record<string, string>,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Post retrieved successfully",
      data: post,
    });
  }),

  getPostDetailsBySlug: catchAsync(
    async (req: TRequest, res: TResponse, next: TNext) => {
      const { slug } = req.params;
      const post = await PostServices.getPostDetailsBySlug(slug);

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Post details retrieved successfully",
        data: post,
      });
    },
  ),

  updatePostById: catchAsync(
    async (req: TRequest, res: TResponse, next: TNext) => {
      const { postId } = req.params;
      const updateData = {
        ...req.body,
        ...(req.file && { image: req.file.path }),
      };
      const post = await PostServices.updatePostById(postId, updateData);

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Post updated successfully",
        data: post,
      });
    },
  ),

  softDeletePostByIds: catchAsync(
    async (req: TRequest, res: TResponse, next: TNext) => {
      const { postIds } = req.body;
      const deletedPosts = await PostServices.softDeletePostByIds(postIds);

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Posts moved to the trash successfully.",
        data: deletedPosts,
      });
    },
  ),

  permanentDeletePostByIds: catchAsync(
    async (req: TRequest, res: TResponse, next: TNext) => {
      const { postIds } = req.body;
      const deletedPosts = await PostServices.permanentDeletePostByIds(postIds);

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Posts permanently deleted successfully",
        data: deletedPosts,
      });
    },
  ),
};
