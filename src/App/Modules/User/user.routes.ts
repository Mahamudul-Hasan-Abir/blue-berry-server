import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { UserControllers } from "./user.controller";

const router = Router();

router.get(
  "/get-all-users",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getAllUsers
);

router.get("/user");

export const UserRoutes = router;
