// Booking Schema
import mongoose, { Schema } from "mongoose";
const bookingSchema = new Schema(
  {
    date: { type: Date, default: Date.now() },
    first: String,
    second: String,
    third: String,
    fourth: String,
    fifth: String,
    sixth: String,
  },
  { timestamps: true }
);

export const Booking = mongoose.model("booking", bookingSchema);
