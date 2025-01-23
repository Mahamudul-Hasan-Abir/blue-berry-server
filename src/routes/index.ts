import { Router } from "express";
import { AuthRoutes } from "../App/Modules/Auth/auth.routes";
import { UserRoutes } from "../App/Modules/User/user.routes";
import { ProductRoutes } from "../App/Modules/Product/product.routes";
import { CartRoutes } from "../App/Modules/Cart/cart.routes";
import { WishlistRoutes } from "../App/Modules/Wishlist/wish.routes";
import { OrderRoutes } from "../App/Modules/Order/Order.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },

  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/user-cart",
    route: CartRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
