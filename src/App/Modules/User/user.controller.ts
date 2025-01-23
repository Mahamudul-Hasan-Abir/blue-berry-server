import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import AppError from "../../Errors/AppError";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Profiles are retrived successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await UserService.getSingleUserFromDB(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const payload = req.body;
  const result = await UserService.updateSingleUserFromDB(userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const cart = await UserService.getCart(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart Retrived",
    data: cart,
  });
});

const addToCart = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const { productId, number } = req.body;
  const updatedUser = await UserService.addToCart(userId, productId, number);

  if (!updatedUser) {
    console.error("No User Found in the database");
    throw new AppError(httpStatus.BAD_REQUEST, "No User Found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart added successfully",
    data: updatedUser,
  });
});

const updateCartItem = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { productId, number } = req.body;

  const updatedUser = await UserService.updateCartItem(
    userId,
    productId,
    number
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product number updated successfully",
    data: updatedUser.cart,
  });
});

const removeCartItem = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.productId as string;

  const updatedUser = await UserService.removeCartItem(userId, productId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product removed from cart successfully",
    data: updatedUser.cart,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  updateProfile,
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};
