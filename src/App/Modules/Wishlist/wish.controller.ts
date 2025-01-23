import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { WishlistServices } from "./wish.service";

const addProductToWishlist = catchAsync(async (req, res) => {
  const { userId } = req.user || {};
  const { productId } = req.body;

  if (!userId || !productId) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "User ID and Product ID are required",
    });
  }

  const result = await WishlistServices.addProductToWishlist(userId, productId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product added to wishlist successfully",
    data: result,
  });
});

const removeProductFromWishlist = catchAsync(async (req, res) => {
  const { userId } = req.user || {};
  const { productId } = req.body;

  const result = await WishlistServices.removeProductFromWishlist(
    userId,
    productId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product removed from wishlist successfully",
    data: result,
  });
});

const getWishlist = catchAsync(async (req, res) => {
  const { userId } = req.user || {};
  const result = await WishlistServices.getWishlistByUserId(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wishlist retrieved successfully",
    data: result,
  });
});

export const WishlistControllers = {
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlist,
};
