import { OrderModel } from "../order.model";
import { ProductModel } from "../product.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (order: TOrder) => {
  try {
    // Fetch the product to check its available quantity
    const orderQuantityInProduct = await ProductModel.findOne(
      { _id: order.product },
      { quantity: 1, _id: 0 }
    );

    if (!orderQuantityInProduct) {
      throw new Error("Product not found");
    }

    // Check if the available quantity is greater than or equal to the order quantity
    if (orderQuantityInProduct.quantity >= order.quantity) {
      // Create the order in the database
      const result = await OrderModel.create(order);
      const updatedQuantity = orderQuantityInProduct.quantity - order.quantity;
      await ProductModel.findByIdAndUpdate(
        order.product,
        {
          $set: { quantity: updatedQuantity },
        },
        { new: true } // Use the session here
      );

      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const calculateOrderIntoDB = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null, // calculate all orders
        totalRevenue: {
          $sum: {
            $multiply: ["$totalPrice", "$quantity"], // Multiply totalPrice and quantity
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  // If no orders are found, set totalRevenue to 0
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

  return totalRevenue;
};

export const OrderServices = {
  createOrderIntoDB,
  calculateOrderIntoDB,
};
