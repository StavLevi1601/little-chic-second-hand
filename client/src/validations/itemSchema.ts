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
  buyer_id: z.string().optional(),
  seller_id: z.string(),
});

export type ItemSchema = z.infer<typeof itemSchema>;

export const itemSchemaCreate = itemSchema.omit({
  id: true,
  status: true,
});

export type ItemSchemaCreate = z.infer<typeof itemSchemaCreate>;

export const itemSchemaAddItem = itemSchema.omit({
  id: true,
  image: true,
  status: true,
});

export const itemsSchemaKeys = Object.keys(itemSchemaAddItem.shape) as Array<
  keyof typeof itemSchemaAddItem.shape
>;

export type ItemSchemaAddItem = z.infer<typeof itemSchemaAddItem>;

export const itemSchemaFilter = itemSchema.omit({
  name: true,
  image: true,
  description: true,
});

export const itemsSchemaFilterKeys = Object.keys(
  itemSchemaFilter.shape
) as Array<keyof typeof itemSchemaFilter.shape>;

export const itemSchemaSortItems = itemSchema.omit({
  id: true,
  image: true,
  description: true,
});

export type ItemSchemaSortItems = z.infer<typeof itemSchemaSortItems>;

export type SortKey = keyof ItemSchemaSortItems;

export const sortKeySchema = Object.keys(itemSchemaSortItems.shape) as Array<
  keyof typeof itemSchemaSortItems.shape
>;
