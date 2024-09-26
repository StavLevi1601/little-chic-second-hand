import express from "express";
const router = express.Router();
import { generateAccessToken } from "../middleware/auth.js";
import { Users } from "../Models/users.js";
import crypto from "crypto";
router.post("/", async (req, res) => {
  try {
    const token = generateAccessToken({
      username: req.body.email,
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


router.get('/validate-token', async (req,res)=> {
  console.log("ffff");
  res.json({
    success: true,
    message: "Token is valid"
  })
})

export default router;
