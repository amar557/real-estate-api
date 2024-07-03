import express from "express";
import {
  createuser,
  deleteSUser,
  loginwithgoogle,
  upateUser,
  verifyUser,
  getUser,
} from "../controllers/createuser.controller.js";
const router = express.Router();
router.post("/createuser", createuser);
router.delete("/delete/:id", deleteSUser);
router.post("/loginwithgoogle", loginwithgoogle);
router.post("/update/:id", upateUser);
router.post("/userexist", verifyUser);
router.get("/getUser/:id", getUser);
export default router;
