/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { TNext, TRequest, TResponse } from "../../types/global";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { AuthServices } from "./auth.service";

export const AuthController = {
  credentialsLogin: catchAsync(
    async (req: TRequest, res: TResponse, next: TNext) => {
      const payload = req.body;

      const { accessToken, refreshToken, user } =
        await AuthServices.credentialsLogin(payload);

      setAuthCookie(res, { accessToken, refreshToken });

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User logged in successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    },
  ),

  getMe: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const { userId, role } = req.user as JwtPayload;

    const result = await AuthServices.getMe(userId, role);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  }),

  getNewAccessToken: catchAsync(
    async (req: TRequest, res: TResponse, next: TNext) => {
      const refreshToken = req?.cookies?.refreshToken;

      const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

      setAuthCookie(res, tokenInfo);

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "New access token generated successfully",
        data: tokenInfo,
      });
    },
  ),

  logout: catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    res.clearCookie("accessToken", {
      httpOnly: true, // Safer from XSS
      secure: envVars.NODE_ENV === "production", // Only sends over HTTPS on production
      sameSite: "none",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true, // Safer from XSS
      secure: envVars.NODE_ENV === "production", // Only sends over HTTPS on production
      sameSite: "none",
    });

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Logged Out Successfully",
      data: null,
    });
  }),
};
