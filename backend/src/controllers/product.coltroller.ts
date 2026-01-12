import { Context } from "hono";
import { prisma } from "../db/prisma";

export const ProductController = {
  createProduct: async (c: Context) => {
    const body = await c.req.json();
    const product = await prisma.product.create({ data: body });
    return c.json(product);
  },

  getProducts: async (c: Context) => {
    const products = await prisma.product.findMany();
    return c.json(products);
  },

  getProductById: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const product = await prisma.product.findUnique({ where: { id } });
    return c.json(product);
  },

  updateProduct: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: body,
    });

    return c.json(updated);
  },

  patchProduct: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: body, // only update fields provided
    });

    return c.json(updated);
  },

  deleteProduct: async (c: Context) => {
    const id = Number(c.req.param("id"));

    const deleted = await prisma.product.delete({
      where: { id },
    });

    return c.json(deleted);
  },
};