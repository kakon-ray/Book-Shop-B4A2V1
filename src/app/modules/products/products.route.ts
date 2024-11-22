import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.post("/products", productController.createProduct);
router.get("/products", productController.getAllBook);
router.get("/products/:productId", productController.getSpecificBook);
router.put("/products/:productId", productController.updateBookInfo);
router.delete("/products/:productId", productController.deleteBookInfo);

export const ProductRoutes = router;
