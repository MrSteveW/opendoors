import express from "express";
import { Booking } from "../db/models/booking.js";

export const router = express.Router();

// Helper: get today's start and end times
function getTodayRange() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return { today, tomorrow };
}

// CREATE Booking (only 1 per day)
router.post("/", async (req, res) => {
  try {
    const { today, tomorrow } = getTodayRange();

    // Check if booking exists for today
    const existing = await Booking.findOne({
      date: { $gte: today, $lt: tomorrow },
    });

    if (existing) {
      return res
        .status(400)
        .json({ error: "Booking already exists for today's date" });
    }

    // Create new booking for today
    const booking = new Booking({
      ...req.body,
      date: today, // normalize to midnight
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ======================
// READ all bookings for today
// ======================
router.get("/", async (req, res) => {
  try {
    const { today, tomorrow } = getTodayRange();
    const bookings = await Booking.find({
      date: { $gte: today, $lt: tomorrow },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================
// READ one booking by ID
// ======================
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ======================
// UPDATE booking by ID (partial slot updates supported)
// ======================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ======================
// DELETE booking by ID
// ======================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
