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
};
