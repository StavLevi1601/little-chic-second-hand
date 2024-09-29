import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (username: string) => {
  return jwt.sign(username, process.env?.JWT_SECRET!, {
    expiresIn: "24h",
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

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // Add the decoded user info to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authenticateToken;
