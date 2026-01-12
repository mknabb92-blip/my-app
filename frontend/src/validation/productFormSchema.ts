import { z } from "zod";

export const productStatusEnum = z.enum(["draft", "active", "blocked"]);

export const productFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),

  // coerce string from input to number
  price: z.coerce.number().positive("price must be positive"),

  sku: z.string().min(1, "sku is required"),

  // coerce string from input to integer
  stock: z.coerce
    .number()
    .int("stock must be an integer")
    .nonnegative("stock must be 0 or more"),

  status: productStatusEnum,
});

export type ProductFormInput = z.infer<typeof productFormSchema>;