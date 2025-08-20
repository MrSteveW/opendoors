// routes/pupils.js
import express from "express";
import { Pupil } from "../db/models/pupil.js";
import jwt from "jsonwebtoken";

export const router = express.Router();

//function for authenticating JWT when any of following routes is requested
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = decoded; // contains { username, role, classname }
    next();
  });
}

// Middleware to enforce role
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

//GET pupils 1: Admin sees all pupils
router.get(
  "/admin",
  authenticateToken,
  authorizeRole("admin"), // must match casing of role you set in token
  async (req, res) => {
    try {
      const pupils = await Pupil.find(); // all pupils
      res.json(pupils);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch pupils" });
    }
  }
);

//GET pupils 2: User sees only pupils in their own classname
router.get("/", authenticateToken, async (req, res) => {
  try {
    const classname = req.user.classname; // from JWT
    if (!classname) {
      return res
        .status(400)
        .json({ error: "No classname found in token payload" });
    }
    const pupils = await Pupil.find({ classname }); // filter by classname
    res.json(pupils);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pupils" });
  }
});

//CREATE NEW PUPIL: only admin
router.post(
  "/admin",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const pupil = new Pupil(req.body);
      await pupil.save();
      res.status(201).json(pupil);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//UPDATE PUPIL BY ID: only admin
router.put(
  "/admin/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const updatedPupil = await Pupil.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedPupil) {
        return res.status(404).json({ error: "Pupil not found" });
      }
      res.json(updatedPupil);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//DELETE PUPIL BY ID
router.delete(
  "/admin/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const deletedPupil = await Pupil.findByIdAndDelete(req.params.id);
      if (!deletedPupil) {
        return res.status(404).json({ error: "Pupil not found" });
      }
      res.json({ message: "Pupil deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);
