// src/Modules/Order/Order.interface.ts
import { ObjectId, Schema } from "mongoose";

export interface IOrderProduct {
  product: ObjectId;
  quantity: number;
}

export interface TOrder {
  user: ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  status: "pending" | "completed" | "canceled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TOrderModel extends TOrder {
  _id: ObjectId;
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
