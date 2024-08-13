import express from "express";
const router = express.Router();
import { generateAccessToken } from "../middleware/auth.js";
import { Users } from "../Models/users.js";
import crypto from "crypto";
router.post("/", async (req, res) => {
  try {
    const token = generateAccessToken({
      username: req.body.username,
      password: req.body.password,
    });

    res.json({
      success: true,
      message: "login working",
      token: token,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
