import mongoose from "mongoose";

export const Users = mongoose.model("Users", {
  email: String,
  password: String,
});
