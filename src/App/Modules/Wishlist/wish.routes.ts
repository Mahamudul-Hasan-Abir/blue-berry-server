import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { WishlistControllers } from "./wish.controller";

const router = Router();

router.post(
  "/add",
  auth(USER_ROLE.user),
  WishlistControllers.addProductToWishlist
);
router.post(
  "/remove",
  auth(USER_ROLE.user),
  WishlistControllers.removeProductFromWishlist
);
router.get("/", auth(USER_ROLE.user), WishlistControllers.getWishlist);

export const WishlistRoutes = router;
