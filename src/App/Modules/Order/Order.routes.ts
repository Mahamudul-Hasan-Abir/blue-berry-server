import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { OrderControllers } from "./Order.controller";

const router = Router();

router.post("/post", auth(USER_ROLE.user), OrderControllers.createOrder);
router.delete(
  "/order/:orderId",
  auth(USER_ROLE.user),
  OrderControllers.removeOrder
); // User can delete their order
router.get("/get", auth(USER_ROLE.user), OrderControllers.getUserOrders);

router.get("/admin", auth(USER_ROLE.admin), OrderControllers.getAllOrders);
router.patch(
  "/admin/order/:orderId",
  auth(USER_ROLE.admin),
  OrderControllers.updateOrderStatus
);

export const OrderRoutes = router;
