import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import cloudinary from "../../config/cloudinaryConfig";

export const jwtSecret =
  "b2f5d5c9f8e341d7b72a589f21c0a7e9816cf502b31b7ad2b3c4e1d84927f34a";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User already exist");
  }
  /* Checking profile image */
  let profileImageUrl = "";
  if (payload.profileImage) {
    const result = await cloudinary.uploader.upload(payload.profileImage, {
      folder: "user_profiles",
    });
    profileImageUrl = result.secure_url;
  }
  const userData = { ...payload, profileImage: profileImageUrl };
  const result = await User.create(userData);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Email or Password");
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is deleted");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Password");
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, jwtSecret as string, {
    expiresIn: "30d",
  });

  const { isDeleted, password, ...restData } = user.toObject();
  return {
    accessToken,
    restData,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
