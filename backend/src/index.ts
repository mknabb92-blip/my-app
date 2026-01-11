import { Hono } from "hono";
import { serve } from "@hono/node-server";
import auth from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

app.route("/api/auth", auth);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Backend running at http://localhost:3000");
