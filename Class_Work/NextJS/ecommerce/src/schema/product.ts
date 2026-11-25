import {z} from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().max(100).optional(),
  price: z.coerce.number().positive().min(1),
  rating: z.coerce.number().positive().max(5)
});

export const createProductSchema = z.object({
  products: z.array(productSchema)
})