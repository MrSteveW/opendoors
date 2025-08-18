// User Schema
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  classname: String,
});

export const User = mongoose.model("user", userSchema);
