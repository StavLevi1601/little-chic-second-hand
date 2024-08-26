import { z } from "zod";

const imageUrlSchema = z.string().refine((value) => {
  try {
    new URL(value);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
});

export const itemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  status: z.string(),
  price: z.number(),
  size: z.string(),
  imageUrl: imageUrlSchema,
});

export type ItemSchema = z.infer<typeof itemSchema>;
