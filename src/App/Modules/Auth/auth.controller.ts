import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { Request, Response } from "express";

// Create user controller
const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { body, file } = req;

      if (body.firstName && body.lastName) {
        body.name = `${body.firstName} ${body.lastName}`;
      }

      if (file) {
        body.profileImage = file.path;
      }

      const result = await AuthServices.createUserIntoDB(body);

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      console.error("An error occurred during user registration:", error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Login user controller
const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      token: result.accessToken,
      data: result.restData,
    });
  }
);

export const AuthControllers = {
  createUser,
  loginUser,
};
