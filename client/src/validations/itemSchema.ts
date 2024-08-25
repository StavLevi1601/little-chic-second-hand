import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  status: z.string(),
  price: z.number(),
  size: z.string(),
});

export type ItemSchema = z.infer<typeof itemSchema>;
