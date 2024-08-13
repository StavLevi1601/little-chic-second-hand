import mongoose from "mongoose";

export const Users = mongoose.model("Users", {
  username: String,
  password: String,
});
