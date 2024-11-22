import { Request, Response } from "express";

import { z } from "zod";
import { OrderValidationSchema } from "./order.validation";
import { OrderServices } from "./order.service";

// this method create new book item from product table
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    // data validation useing zod

    const zodParseData = OrderValidationSchema.parse(order);

    const result = await OrderServices.createOrderIntoDB(zodParseData);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Order created successfully",
        data: result,
      });
    } else {
      res.status(500).json({
        success: true,
        message: "Order created faild",
        data: {
          ErrorMessage: "Do not enough quantity if you need",
        },
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

const calcualteOrderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateOrderIntoDB();

    res.status(200).json({
      success: true,
      message: "Revenue calculated successfully",
      data: {
        totalRevenue: result,
      },
    });
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

export const orderController = {
  createOrder,
  calcualteOrderRevenue,
};
