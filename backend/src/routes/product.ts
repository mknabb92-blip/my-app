import { Hono } from "hono";
import { ProductController } from "../controllers/product.coltroller";

const product = new Hono();

// create product
product.post("/", ProductController.createProduct);

// get all products
product.get("/", ProductController.getProducts);

// get one product by id
product.get("/:id", ProductController.getProductById);

// update entire product
product.put("/:id", ProductController.updateProduct);

// partial update (only update provided fields)
product.patch("/:id", ProductController.patchProduct);

// delete product
product.delete("/:id", ProductController.deleteProduct);

export default product;