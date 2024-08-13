import z from "zod";
import { status } from "../enums/status.js";

export const itemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  status: z.enum(status),
});

// id: String,
// title: String,
// body: String,
// buyer_id: String,
// seller_id: String,
// status: {
//   type: String,
//   enum: ["available", "sold"],
//   default: "available",
// },
// created_at: Date,
