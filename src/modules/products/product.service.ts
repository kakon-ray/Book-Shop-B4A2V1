import { ProductModel } from "../product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (product: TProduct) => {
  // built in static method

  const result = await ProductModel.create(product);

  return result;
};

const getAllBookFromDB = async () => {
  const result = await ProductModel.find({});

  return result;
};

const getSpecificBookFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });

  return result;
};

const updateBookInfoFromDB = async (id: string, updateData: object) => {
  try {
    // Find the document by ID and update it
    const result = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      { new: true } // Return the updated document
    );

    if (result) {
      return result;
    } else {
      console.log("Product not found.");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const deleteBookInfoFromDB = async (id: string) => {
  try {
    // Find the document by ID and update it
    const result = await ProductModel.deleteOne({ _id: id });

    if (result) {
      return result;
    } else {
      console.log("Product not found.");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllBookFromDB,
  getSpecificBookFromDB,
  updateBookInfoFromDB,
  deleteBookInfoFromDB,
};
