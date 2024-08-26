import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (username: string) => {
  return jwt.sign(username, process.env?.JWT_SECRET!, {
    expiresIn: "5h",
  });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401);

  jwt.verify(token, process.env?.JWT_SECRET!, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

export default authenticateToken;
