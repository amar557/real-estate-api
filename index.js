import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/Auth.route.js";
import listingapi from "./routes/Listing.route.js";
dotenv.config();
const app = express();
var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  Credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use("/api", listingapi);

app.use(cookieParser());
app.use((err, req, res, next) => {
  let message = err.errmsg || "internal server error";
  let statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ message, statusCode, success: false });
});
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("database connected"));
app.listen(3000, () => {
  console.log("hi there");
});
