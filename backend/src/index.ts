import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import auth from "./routes/auth";
import product from "./routes/product";
import dotenv from "dotenv";
import { globalAuthMiddleware } from "./middlewares/auth.middleware";

dotenv.config();

const app = new Hono();

// use frontend url from .env
app.use(
  "/*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);

// auth middleware for everything except signup/login
app.use("/*", globalAuthMiddleware);

app.route("/api/auth", auth);
app.route("/api/product", product);

const port = 3000;
console.log(`Backend running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});