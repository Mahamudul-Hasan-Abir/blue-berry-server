import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./Order.service";

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { products } = req.body;

  const order = await OrderService.createOrder(userId, products);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order created successfully",
    data: order,
  });
});

const removeOrder = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const orderId = req.params.orderId as string;

  const order = await OrderService.removeOrder(
    orderId,
    userId,
    req.user.role === "admin"
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order removed successfully",
    data: order,
  });
});

// Controller for getting user's orders
const getUserOrders = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const orders = await OrderService.getUserOrders(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully",
    data: orders,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await OrderService.getAllOrders();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All orders fetched successfully",
    data: orders,
  });
});

// Controller for updating order status (admin)
const updateOrderStatus = catchAsync(async (req, res) => {
  const orderId = req.params.orderId as string;
  const { status } = req.body;
  const updatedOrder = await OrderService.updateOrderStatus(orderId, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status updated successfully",
    data: updatedOrder,
  });
});

export const OrderControllers = {
  updateOrderStatus,
  getAllOrders,
  getUserOrders,
  removeOrder,
  createOrder,
};
