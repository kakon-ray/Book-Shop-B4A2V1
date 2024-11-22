export type TCategory =
  | "Fiction"
  | "Science"
  | "SelfDevelopment"
  | "Poetry"
  | "Religious";

export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
