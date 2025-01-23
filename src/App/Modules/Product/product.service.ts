import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { TProduct, TReview } from "./product.interface";
import Product from "./product.model";
import cloudinary from "../../config/cloudinaryConfig";

const createProductIntoDB = async (
  payload: TProduct,
  file: Express.Multer.File
) => {
  let image = "";
  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "product_images",
    });
    image = result.secure_url;
  }
  const productData = { ...payload, image: image };
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};
const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "No Product Found");
  }
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    projection: {
      isDeleted: 0,
    },
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "No Product Found");
  }
  if (product.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "No Product Found");
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },

    { new: true, projection: { isDeleted: 0 } }
  );

  return result;
};
const addReviewToProduct = async (productId: string, review: TReview) => {
  const product = await Product.findOneAndUpdate(
    { _id: productId, isDeleted: false },
    { $push: { reviews: review } },
    { new: true, runValidators: true }
  ).populate({
    path: "reviews.userId",
    select: "name email",
  });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  return product;
};

export const ProductServics = {
  createProductIntoDB,
  updateProductFromDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  addReviewToProduct,
};
