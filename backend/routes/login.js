//routes/login.js
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
router.post("/", async (req, res) => {
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
      username: user.username, //sent within JWT payload
      role: user.role,
      classname: user.classname,
    });
    res.status(200).json({
      //sent outside of token...are these necessary?!
      accessToken: accessToken, //PAYLOAD IS SINGLE SOURCE OF TRUTH
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
