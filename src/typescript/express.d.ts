// express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or whatever type your userId is
    }
  }
}
