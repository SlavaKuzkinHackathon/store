import { z } from 'zod';

export const ProductImageSchema = z.object({
  id: z.number(),
  image: z.string()
})

export type IProductImage = z.infer<typeof ProductImageSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  in_stock: z.number(),
  rating: z.number(),
  productImage: z.array(ProductImageSchema),
});

export type IProduct = z.infer<typeof ProductSchema>

