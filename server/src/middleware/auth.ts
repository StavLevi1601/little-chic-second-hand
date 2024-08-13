import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const generateAccessToken = (username: string) => {
  return jwt.sign(username, process.env?.TOKEN_SECRET!, {
    expiresIn: "1800s",
  });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401);

  jwt.verify(token, process.env?.TOKEN_SECRET!, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

export default authenticateToken;
