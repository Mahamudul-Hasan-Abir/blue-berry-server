import { Model, Types } from "mongoose";

export type TWishlistProduct = {
  productId: string;
};

export interface TWishlist {
  userId: string;
  products: TWishlistProduct[];
}

export interface TWishlistModel extends Model<TWishlist> {
  userId: Types.ObjectId;
  products: TWishlistProduct[];
}
