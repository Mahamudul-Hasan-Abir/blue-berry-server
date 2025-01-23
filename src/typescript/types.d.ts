import { Request } from "express";
import { Express } from "express";

declare module "express-serve-static-core" {
  interface Request {
    file?: Express.Multer.File;
  }
}
