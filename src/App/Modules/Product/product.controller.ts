import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServics } from "./product.service";
import { TReview } from "./product.interface";
import AppError from "../../Errors/AppError";

const addProduct = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, "File is required");
  }
  const result = await ProductServics.createProductIntoDB(req.body, req.file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product added successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServics.getAllProductsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product id retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product ID is required");
  }
  const result = await ProductServics.getSingleProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id!;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product ID is required");
  }
  const result = await ProductServics.updateProductFromDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product ID is required");
  }
  const result = await ProductServics.deleteProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product deleted Successfully",
  });
});

const addReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const review: TReview = {
    userId: req.user?.userId,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  const result = await ProductServics.addReviewToProduct(
    productId as string,
    review
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review added successfully",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
