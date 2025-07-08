import jwt from "jsonwebtoken";

import { User } from "@repo/db";

export const generateToken = ({ id, email }: Pick<User, "id" | "email">) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!);
};
