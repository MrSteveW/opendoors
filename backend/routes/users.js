//routes/user.js
import express from "express";
import { User } from "../db/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const router = express.Router();

//generate access tokens
function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET, {
    expiresIn: "1800s",
  });
}

//CREATE NEW USER
router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists!",
      });
    } // generate salt + hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
      classname: req.body.classname,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created!",
    });
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    // Find a user
    const user = await User.findOne({ username: req.body.username });
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
    const accessToken = generateAccessToken({ user: req.body.username });
    res.status(200).json({
      accessToken: accessToken,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
