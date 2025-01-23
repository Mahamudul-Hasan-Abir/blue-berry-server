import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../Modules/Auth/auth.interface";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../Modules/Auth/auth.service";
import { User } from "../Modules/User/user.model";

const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token as string, jwtSecret as string);

    if (!decoded) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    const { userId, role } = decoded as JwtPayload;

    const user = await User.isUserExist(userId);
    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    }
    if (requireRoles && !requireRoles.includes(role)) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "You have no access to this route",
      });
    }

    req.userId = userId;
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
