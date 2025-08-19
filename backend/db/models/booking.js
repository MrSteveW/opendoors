// Booking Schema
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    date: {
      type: Date,
      default: () => new Date(new Date().setHours(0, 0, 0, 0)),
      unique: true,
    },
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
