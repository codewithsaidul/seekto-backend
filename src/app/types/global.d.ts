import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export type TRequest = Request;
export type TResponse = Response;
export type TNext = NextFunction;
