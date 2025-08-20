// Pupil Schema
import mongoose, { Schema } from "mongoose";
const pupilSchema = new Schema({
  name: String,
  classname: String,
  year: Number,
});

export const Pupil = mongoose.model("pupil", pupilSchema);
