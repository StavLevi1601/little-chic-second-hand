import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
import { generateAccessToken } from "../middleware/auth.js";
import { Users } from "../Models/users.js";
import crypto from "crypto";
import { log } from "console";
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


router.get('/validate-token', async (req, res) => {
  console.log("stav");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    });
  }

  console.log("token",token);
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET,async (err,jwtPayload)=> {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "The token expired",
        });
      }

      console.log("jwtPayloadjwtPayload",jwtPayload);

      if (!jwtPayload.username || typeof jwtPayload.username === "undefined")
        return res.status(403).json({
          success: false,
          message: "Bad token",
        });
      
        const user = await Users.findOne({ email: jwtPayload.username });
        req.user = user;
        return res.json({
          success: true,
          message: "Token is valid",
          user: {
            id: user._id,
          }
        });
    });


});

export default router;
