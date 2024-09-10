import z from "zod";
import { status } from "../enums/status.js";

export const itemSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
  status: z.enum(status),
  price: z.number(),
  color: z.string(),
  size: z.string(),
});
