import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";

import { UserControllers } from "../User/user.controller";

const router = Router();

router.get("/cart", auth(USER_ROLE.user), UserControllers.getCart);
router.post("/cart/add", auth(USER_ROLE.user), UserControllers.addToCart);
router.patch(
  "/cart/update",
  auth(USER_ROLE.user),
  UserControllers.updateCartItem
);
router.delete(
  "/cart/remove/:productId",
  auth(USER_ROLE.user),
  UserControllers.removeCartItem
);
export const CartRoutes = router;
