//app.js should only set up middleware and routes, and then export the app:
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router as bookingsRouter } from "./routes/bookings.js";
import { router as pupilsRouter } from "./routes/pupils.js";
import { router as usersRouter } from "./routes/users.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
//Always put app.use(cors()) and app.use(express.json()) before mounting routes.
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/pupils", pupilsRouter);
app.use("/api/v1/users", usersRouter);

/* really useful debuggin
app.use((req, res, next) => {
  console.log("🔎 Incoming Request:", req.method, req.url);
  console.log("Headers:", req.headers);
  next();
});*/
export default app;
