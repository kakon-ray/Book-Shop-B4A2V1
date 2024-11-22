import { z } from "zod";

const TCategory = z.enum([
  "Fiction",
  "Science",
  "SelfDevelopment",
  "Poetry",
  "Religious",
]);

const ProductValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.number().positive("Price must be greater than zero"),
  category: TCategory,
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity must be 0 or greater"),
  inStock: z.boolean(),
});

export default ProductValidationSchema;
