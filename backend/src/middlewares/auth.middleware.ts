import type { MiddlewareHandler } from "hono";
import { jwt } from "hono/jwt";

export const globalAuthMiddleware: MiddlewareHandler = async (c, next) => {
  const path = c.req.path;
  const method = c.req.method.toLowerCase();

  // public routes (no auth needed)
  const publicRoutes = [
    { method: "post", path: "/api/auth/signup" },
    { method: "post", path: "/api/auth/login" }
  ];

  // check if current route matches a public route
  const isPublic = publicRoutes.some(
    (r) => r.method === method && r.path === path
  );

  if (isPublic) {
    return next();
  }

  // protected route → verify jwt
  return jwt({
    secret: process.env.JWT_SECRET || "dev-secret",
  })(c, next);
};