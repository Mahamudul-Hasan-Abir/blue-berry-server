import httpStatus from "http-status";

import Product from "../Product/product.model";
import { User } from "../User/user.model";
import AppError from "../../Errors/AppError";
import Order from "./Order.model";

const createOrder = async (
  userId: string,
  products: { productId: string; quantity: number }[]
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  const orderProducts = [];
  let totalPrice = 0;

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Product not found: ${item.productId}`
      );
    }

    totalPrice += product.price * item.quantity;
    orderProducts.push({ product: item.productId, quantity: item.quantity });
  }

  const order = await Order.create({
    user: userId,
    products: orderProducts,
    totalPrice,
    status: "pending",
  });

  return order;
};

const removeOrder = async (
  orderId: string,
  userId: string,
  isAdmin: boolean
) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  if (!isAdmin && order.user.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only remove your own orders"
    );
  }

  await Order.findByIdAndDelete(orderId);
  return order;
};

const getUserOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId }).populate(
    "products.product"
  );
  return orders;
};

const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("user")
    .populate("products.product");
  return orders;
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  if (!["pending", "completed", "canceled"].includes(status)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status");
  }

  order.status = status as "pending" | "completed" | "canceled";
  await order.save();
  return order;
};

export const OrderService = {
  createOrder,
  removeOrder,
  updateOrderStatus,
  getUserOrders,
  getAllOrders,
};
