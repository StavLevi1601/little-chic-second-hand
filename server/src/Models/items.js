import mongoose from "mongoose";
import { uuid } from "uuidv4";

export const Items = mongoose.model("Items", {
  id: { type: String, require: true, default: uuid() },
  name: String,
  type: String,
  description: String,
  price: Number,
  color: String,
  size: String,
  status: {
    type: String,
    enum: ["available", "not available"],
    default: "available",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  buyer_id: String,
  seller_id: String,
});

//TODO:: adding uuid
