import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

const saultRounds = 10;

const getAllUsersFromDB = async () => {
  const users = await User.find({});
  return users;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "NO User Found");
  }
  const { isDeleted, password, ...restData } = user.toObject();

  return restData;
};

const updateSingleUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "No User Found");
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "No Active User Found");
  }
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload?.password,
      Number(saultRounds)
    );
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    projection: {
      isDeleted: 0,
      password: 0,
    },
  });

  return result;
};
/* Cart Logic */
const getCart = async (userId: string) => {
  const user = await User.findById(userId).populate("cart.product");
  return user?.cart || [];
};

const addToCart = async (userId: string, productId: string, number: number) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "No User Found");
  }
  const cartItem = user.cart.find(
    (item) => item.product.toString() === productId
  );
  if (cartItem) {
    cartItem.number += number;
  } else {
    user.cart.push({
      product: new Types.ObjectId(productId),
      number,
    });
  }
  await user.save();
  return await User.findById(userId).populate("cart.product");
};

const updateCartItem = async (
  userId: string,
  productId: string,
  number: number
) => {
  const result = await User.findOneAndUpdate(
    { _id: userId, "cart.product": productId },
    { $set: { "cart.$.number": number } },
    { new: true }
  ).populate("cart.product");

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found in cart");
  }

  return result;
};

const removeCartItem = async (userId: string, productId: string) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { cart: { product: new Types.ObjectId(productId) } } },
    { new: true }
  ).populate("cart.product");

  if (!updatedUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found or product not in cart"
    );
  }

  return updatedUser;
};

export const UserService = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
};
