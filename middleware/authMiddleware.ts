import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface Decoded {
  id: string;
  phoneNumber: number;
  fullname: string;
  tier: number;
  email: string;
}
export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const jwtsecret = process.env.JWT_SECRET;
    if (!jwtsecret) {
      return res.status(500).json({
        message: "jwt secret is not defined in env file",
      });
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, jwtsecret) as Decoded;
    const userId = decoded.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    console.log(decoded);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Token has expired",
      });
    }

    return res.status(500).json({
      error: "Internal server error during header validation",
    });
  }
};
