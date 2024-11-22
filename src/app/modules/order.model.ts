import { model, Schema } from "mongoose";
import { TOrder } from "./orders/order.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    product: {
      type: String,
      ref: "Product", // Reference to Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Mongoose model
export const OrderModel = model<TOrder>("Order", orderSchema);
