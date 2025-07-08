import { NextFunction, Request, Response } from "express";

import { User } from "@repo/db";
import { verifyToken } from "../lib/jwt";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "Unathorized." });
    return;
  }

  const [prefix, token] = authHeader.split(" ");

  if (!prefix || prefix !== "Bearer") {
    res.status(401).json({ message: "No bearer prefix found." });
    return;
  }
  if (!token) {
    res.status(401).json({ message: "Token not found." });
    return;
  }

  try {
    const decoded = verifyToken(token) as {
      id: User["id"];
      email: User["email"];
    };
    if (!decoded) {
      res.status(400).json({ message: "Token is invalid!" });
      return;
    }

    if (decoded) {
      req.userId = decoded.id;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
