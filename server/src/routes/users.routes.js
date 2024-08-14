// users.routes.js
import express from "express";
import { generateAccessToken, authenticateToken } from "../middleware/auth.js";
import { Users } from "../Models/users.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("fdsfsfsf");
  // try {
  //   const existingUser = await Users.findOne({
  //     username: req.body.username,
  //   });

  //   if (existingUser) {
  //     return res.status(409).json({
  //       success: false,
  //       message: "User already exists",
  //     });
  //   }

  //   const user = new Users({
  //     username: req.body.username,
  //     password: req.body.password,
  //   });

  //   await user.save();
  //   return res.status(201).json({
  //     success: true,
  //     message: "User created successfully",
  //   });
  // } catch (e) {
  //   res.status(500).json({
  //     success: false,
  //     error: e.message,
  //   });
  // }
});

router.post("/login", authenticateToken, async (req, res) => {
  try {
    const user = await Users.findOne({
      username: req.body.username,
    });

    console.log(user);

    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    res.json({
      success: true,
      message: "login working",
    });

    // res.redirect("/welcome");
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.get("welcome/:username", (req, res) => {
  res.json({
    success: true,
    message: `welcome ${req.params.username}`,
  });
});

export default router;
