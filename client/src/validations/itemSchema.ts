import { z } from "zod";

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
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
  image: z.string().optional(),
});

export type ItemSchema = z.infer<typeof itemSchema>;

export type SortKey = keyof ItemSchema;

export const itemSchemaAddItem = itemSchema.omit({
  image: true,
  status: true,
});

export const itemsSchemaKeys = Object.keys(itemSchemaAddItem.shape) as Array<
  keyof typeof itemSchemaAddItem.shape
>;

export const itemSchemaFilter = itemSchema.omit({
  name: true,
  image: true,
  description: true,
});

export const itemsSchemaFilterKeys = Object.keys(
  itemSchemaFilter.shape
) as Array<keyof typeof itemSchemaFilter.shape>;
