import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./modules/products/products.route";
import { OrderRoutes } from "./modules/orders/order.route";

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Project Run Successfully",
  });
});

export default app;
