// src/Modules/Order/order.model.ts
import { model, Schema } from "mongoose";
import { TOrderModel } from "./Order.interface";

const orderProductSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false } // To avoid adding an _id to each product subdocument
);

const orderSchema = new Schema<TOrderModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [orderProductSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = model<TOrderModel>("Order", orderSchema);

export default Order;
