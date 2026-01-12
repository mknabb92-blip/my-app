import { prisma } from "../db/prisma";
import { z } from "zod";

// validation schemas
const statusEnum = z.enum(["draft", "active", "blocked"]);

const baseProductSchema = {
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  price: z.number().positive("price must be positive"),
  sku: z.string().min(1, "sku is required"),
  stock: z.number().int().nonnegative("stock must be 0 or more"),
  status: statusEnum,
};

const createProductSchema = z.object(baseProductSchema);
const updateProductSchema = z.object(baseProductSchema);
const patchProductSchema = z.object(baseProductSchema).partial();

export const ProductService = {
  createProduct: async (data: unknown) => {
    const parsed = createProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    return prisma.product.create({
      data: parsed.data,
    });
  },

  getProducts: async () => {
    return prisma.product.findMany();
  },

  getProductById: async (id: number) => {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  updateProduct: async (id: number, data: unknown) => {
    const parsed = updateProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    return prisma.product.update({
      where: { id },
      data: parsed.data,
    });
  },

  patchProduct: async (id: number, data: unknown) => {
    const parsed = patchProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    return prisma.product.update({
      where: { id },
      data: parsed.data,
    });
  },

  deleteProduct: async (id: number) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};