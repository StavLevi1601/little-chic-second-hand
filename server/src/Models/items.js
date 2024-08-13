import mongoose from "mongoose";
import { uuid } from "uuidv4";

export const Items = mongoose.model("Items", {
  id: { type: String, require: true, default: uuid() },
  title: String,
  body: String,
  buyer_id: String,
  seller_id: String,
  status: {
    type: String,
    enum: ["available", "sold"],
    default: "available",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

//TODO:: adding uuid
