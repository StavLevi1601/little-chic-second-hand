import { z } from "zod";

export const itemSchema = z.object({
  name: z.string(),
  collectionType: z.string(),
  description: z.string(),
  price: z
    .number()
    .positive()
    .refine((price) => {
      const decimalNumber = (price.toString().split(".")[1] || "").length;
      return decimalNumber >= 2;
    }),
  color: z.string(),
  size: z.string(),
  status: z.string(),
});

export type ItemSchema = z.infer<typeof itemSchema>;

export type SortKey = keyof ItemSchema;
