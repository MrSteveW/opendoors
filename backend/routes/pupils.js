// routes/pupils.js
import express from "express";
import { Pupil } from "../db/models/pupil.js";
import jwt from "jsonwebtoken";

export const router = express.Router();

//function for authenticating JWT when any of following routes is requested
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Login required");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid or expired token");
    req.user = user;
    next();
  });
}

//authorise role middleware
export function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
  };
}

//CREATE NEW PUPIL - protected
router.post(
  "/",
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

//GET ALL PUPILS - protected
router.get("/", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const pupils = await Pupil.find();
    res.json(pupils);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET ONE PUPIL
router.get(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const pupil = await Pupil.findById(req.params.id);
      if (!pupil) {
        return res.status(404).json({ error: "Pupil not found" });
      }
      res.json(pupil);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//UPDATE PUPIL BY ID
router.put(
  "/:id",
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
  "/:id",
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
