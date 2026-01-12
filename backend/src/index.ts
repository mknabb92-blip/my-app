import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors"
import auth from "./routes/auth";
import product from "./routes/product"
import dotenv from "dotenv";
import { globalAuthMiddleware } from "./middlewares/auth.middleware";

dotenv.config();

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",  // <-- frontend url
  })
);


// apply auth middleware to every request except signup/login
app.use("/*", globalAuthMiddleware);

app.route("/api/auth", auth);
app.route("/api/product", product);

const port = 3000;

console.log(`Backend running at http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});