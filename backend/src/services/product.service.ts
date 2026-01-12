import { prisma } from "../db/prisma";
import { z } from "zod";

// ---------------------------------------
// validation schemas
// ---------------------------------------

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

// types
export type ProductCreateData = z.infer<typeof createProductSchema>;
export type ProductUpdateData = z.infer<typeof updateProductSchema>;
export type ProductPatchData = z.infer<typeof patchProductSchema>;

// ---------------------------------------
// service
// ---------------------------------------

export const ProductService = {
  // ---------------- create ----------------
  createProduct: async (data: ProductCreateData) => {
    const parsed = createProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    // validate sku uniqueness
    const existing = await prisma.product.findUnique({
      where: { sku: parsed.data.sku },
    });

    if (existing) {
      throw { type: "duplicate", message: "sku already exists" };
    }

    return prisma.product.create({
      data: parsed.data,
    });
  },

  // ---------------- get all ----------------
  getProducts: async () => {
    return prisma.product.findMany();
  },

  // ---------------- get one ----------------
  getProductById: async (id: number) => {
    return prisma.product.findUnique({ where: { id } });
  },

  // ---------------- update ----------------
  updateProduct: async (id: number, data: ProductUpdateData) => {
    const parsed = updateProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    // check if sku belongs to another product
    const existing = await prisma.product.findUnique({
      where: { sku: parsed.data.sku },
    });

    if (existing && existing.id !== id) {
      throw { type: "duplicate", message: "sku already exists" };
    }

    return prisma.product.update({
      where: { id },
      data: parsed.data,
    });
  },

  // ---------------- patch ----------------
  patchProduct: async (id: number, data: ProductPatchData) => {
    const parsed = patchProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    // sku patch validation (only if sku included)
    if (parsed.data.sku) {
      const existing = await prisma.product.findUnique({
        where: { sku: parsed.data.sku },
      });

      if (existing && existing.id !== id) {
        throw { type: "duplicate", message: "sku already exists" };
      }
    }

    return prisma.product.update({
      where: { id },
      data: parsed.data,
    });
  },

  // ---------------- delete ----------------
  deleteProduct: async (id: number) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};