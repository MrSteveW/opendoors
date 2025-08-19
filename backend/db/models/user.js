// User Schema
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, //also excludes password
  role: String,
  classname: String,
});

// 🚨 Excludes password whenever converting to JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model("user", userSchema);
