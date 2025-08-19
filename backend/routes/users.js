//routes/user.js
import express from "express";
import { User } from "../db/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const router = express.Router();

//LOGIN ROUTE generate access tokens
function generateAccessToken(payload) {
  //payload as a local var?
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1800s" });
}
// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    // Find a user
    const user = await User.findOne({ username: req.body.username }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).json({
        message: "No user found",
      });
    }
    //Compare request hashed password with stored password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
    const accessToken = generateAccessToken({
      username: user.username,
      role: user.role,
    });
    res.status(200).json({
      accessToken: accessToken,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

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

export function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
  };
}

// GET all users (admin only)
router.get("/", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // removes password from json
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new user
router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { username, password, role, classname } = req.body;

      const existing = await User.findOne({ username });
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        role,
        classname,
      });

      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: { username, role, classname },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// UPDATE user by ID
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const updates = { ...req.body };

      // if updating password → hash it again
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      }).select("-password"); // removes password from json

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// DELETE user
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
