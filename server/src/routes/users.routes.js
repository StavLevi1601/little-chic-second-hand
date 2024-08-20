// users.routes.js
import express from "express";
import { generateAccessToken, authenticateToken } from "../middleware/auth.js";
import { Users } from "../Models/users.js";
import crypto from "crypto";
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("fdsfsfsf");
  try {
    const existingUser = await Users.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const passHash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");

    const user = new Users({
      email: req.body.email,
      password: passHash,
    });

    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const passHash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");

    const user = await Users.findOne({
      email: req.body.email,
      password: passHash,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "login working",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

router.get("welcome/:email", (req, res) => {
  res.json({
    success: true,
    message: `welcome ${req.params.email}`,
  });
});

export default router;
