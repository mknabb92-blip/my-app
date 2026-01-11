import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors"
import auth from "./routes/auth";
import { AuthController } from "./controllers/auth.controller";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",  // <-- frontend url
  })
);

// app.route("/api/auth", auth);

app.post("/signup", AuthController.signup);
app.post("/login", AuthController.login);

const port = 3000;

console.log(`Backend running at http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});