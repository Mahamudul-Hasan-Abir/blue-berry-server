import mongoose, { Schema } from "mongoose";
import { TWishlist, TWishlistModel } from "./wish.interface";

const wishlistSchema = new Schema<TWishlist | TWishlistModel>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

const Wishlist = mongoose.model<TWishlist | TWishlistModel>(
  "Wishlist",
  wishlistSchema
);

export default Wishlist;
