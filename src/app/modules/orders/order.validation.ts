import { z } from "zod";

// Zod validation schema for order data
export const OrderValidationSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  product: z.string().min(1, "Product ID is required"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  totalPrice: z.number().min(0, "Total price must be a non-negative number"),
});
