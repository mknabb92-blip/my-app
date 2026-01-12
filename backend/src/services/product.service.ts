import { prisma } from "../db/prisma";
import { z } from "zod";

const statusEnum = z.enum(["draft", "active", "blocked"]);

const baseProductSchema = {
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("price must be positive"),
  sku: z.string().min(1, "sku is required"),
  stock: z.coerce.number().int().nonnegative("stock must be 0 or more"),
  status: statusEnum,
};

const createProductSchema = z.object(baseProductSchema);
const updateProductSchema = z.object(baseProductSchema);
const patchProductSchema = z.object(baseProductSchema).partial();

export type ProductCreateData = z.infer<typeof createProductSchema>;
export type ProductUpdateData = z.infer<typeof updateProductSchema>;
export type ProductPatchData = z.infer<typeof patchProductSchema>;

export const ProductService = {
  // create
  createProduct: async (data: ProductCreateData) => {
    const parsed = createProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    // let prisma enforce sku uniqueness (P2002 if duplicate)
    return prisma.product.create({
      data: parsed.data,
    });
  },

  // get all
  getProducts: async () => {
    return prisma.product.findMany();
  },

  // get one
  getProductById: async (id: number) => {
    return prisma.product.findUnique({ where: { id } });
  },

  // update
  updateProduct: async (id: number, data: ProductUpdateData) => {
    const parsed = updateProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    return prisma.product.update({
      where: { id },
      data: parsed.data,
    });
  },

  // patch
  patchProduct: async (id: number, data: ProductPatchData) => {
    const parsed = patchProductSchema.safeParse(data);
    if (!parsed.success) {
      throw { type: "validation", errors: parsed.error.flatten() };
    }

    return prisma.product.update({
      where: { id },
      data: parsed.data,
    });
  },

  // delete
  deleteProduct: async (id: number) => {
    return prisma.product.delete({ where: { id } });
  },
};