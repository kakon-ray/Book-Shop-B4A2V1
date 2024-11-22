import { Request, Response } from "express";

import { z } from "zod";
import { ProductServices } from "./product.service";
import ProductValidationSchema from "./product.validation";

// this method create new book item from product table
const createProduct = async (req: Request, res: Response) => {
  try {
    // cerating a schema validation

    const product = req.body;

    // data validation useing zod

    const zodParseData = ProductValidationSchema.parse(product);

    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // readble message show
      error.issues.forEach((issue) => {
        res.status(500).json({
          success: false,
          message: "Validation failed",
          errors: issue.message,
        });
      });
    } else {
      console.log("Unexpected error:", error);
    }
  }
};

// this method get all book form product table
const getAllBook = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllBookFromDB();
    if (result) {
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Books retrieved faild",
        data: [],
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // readble message show
      error.issues.forEach((issue) => {
        res.status(500).json({
          success: false,
          message: "Validation failed",
          errors: issue.message,
        });
      });
    } else {
      console.log("Unexpected error:", error);
    }
  }
};

// this method get specific book
const getSpecificBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    // specific book get method
    const result = await ProductServices.getSpecificBookFromDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Book Not Found",
        data: [],
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // readble message show
      error.issues.forEach((issue) => {
        res.status(500).json({
          success: false,
          message: "Book retrieved faild",
          errors: issue.message,
        });
      });
    } else {
      console.log("Unexpected error:", error);
    }
  }
};

const updateBookInfo = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updateData = req.body;

    const result = await ProductServices.updateBookInfoFromDB(id, updateData);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Book Update successfully",
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Book Update faild",
        data: [],
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // readble message show
      error.issues.forEach((issue) => {
        res.status(500).json({
          success: false,
          message: "Book Update faild",
          errors: issue.message,
        });
      });
    } else {
      console.log("Unexpected error:", error);
    }
  }
};

const deleteBookInfo = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    const result = await ProductServices.deleteBookInfoFromDB(id);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Book Deleted successfully",
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Book Not Found",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // readble message show
      error.issues.forEach((issue) => {
        res.status(500).json({
          success: false,
          message: "Book Update faild",
          errors: issue.message,
        });
      });
    } else {
      console.log("Unexpected error:", error);
    }
  }
};

export const productController = {
  createProduct,
  getAllBook,
  getSpecificBook,
  updateBookInfo,
  deleteBookInfo,
};
