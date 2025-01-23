import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { ProductControllers } from "./product.controller";
import upload from "../Auth/auth.multerConfig";

const router = Router();
router.get("/", ProductControllers.getAllProduct);
router.get("/:id", ProductControllers.getSingleProduct);
router.post(
  "/",
  auth(USER_ROLE.admin),
  upload.single("image"),
  ProductControllers.addProduct
);
router.put("/:id", auth(USER_ROLE.admin), ProductControllers.updateProduct);
router.delete("/:id", auth(USER_ROLE.admin), ProductControllers.deleteProduct);
router.post(
  "/:productId/review",
  auth(USER_ROLE.user),
  ProductControllers.addReview
);
export const ProductRoutes = router;
