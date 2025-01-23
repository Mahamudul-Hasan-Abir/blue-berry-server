import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import Wishlist from "./wish.model";

const addProductToWishlist = async (userId: string, productId: string) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $addToSet: { products: { productId } } },
    { new: true, upsert: true }
  );
  return wishlist;
};

const removeProductFromWishlist = async (userId: string, productId: string) => {
  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    throw new AppError(httpStatus.NOT_FOUND, "Wishlist not found");
  }

  const productIndex = wishlist.products.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (productIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not in wishlist");
  }

  wishlist.products.splice(productIndex, 1);
  await wishlist.save();
  return wishlist;
};

const getWishlistByUserId = async (userId: string) => {
  const wishlist = await Wishlist.findOne({ userId }).populate(
    "products.productId"
  );
  if (!wishlist) {
    throw new AppError(httpStatus.NOT_FOUND, "Wishlist not found");
  }
  return wishlist;
};

export const WishlistServices = {
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlistByUserId,
};
