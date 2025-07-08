import { NextFunction, Request, Response } from "express";

import { prisma, User } from "@repo/db";
import { hashPassword, validatePassword } from "../lib/bcryptjs";
import { generateToken } from "../lib/jwt";
import { CustomError } from "../middlewares/errors";
import { EditProfileFormData } from "@repo/db/models/user";

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body as User;

  try {
    const existedUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existedUser) {
      throw new CustomError(
        400,
        "Username is already registered before. Please try with another username."
      );
    }

    const hashedPassword = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      omit: { password: true },
    });

    res.status(200).json({
      message: "User has been successfully registered!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      omit: { password: false },
    });

    if (!user) {
      throw new CustomError(401, "Email or password is not valid.");
    }

    if (!validatePassword(password, user.password)) {
      throw new CustomError(401, "Email or password is not valid.");
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({
      message: "Login successful.",
      user: { ...user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const profile = await prisma.user.findUnique({ where: { id: userId } });

    res.status(200).json({
      message: "Get profile successful.",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { name, about } = req.body as EditProfileFormData;

  try {
    const profile = await prisma.user.update({
      where: { id: userId },
      data: { name, about },
    });

    res.status(200).json({
      message: "Update profile successful.",
      profile,
    });
  } catch (error) {
    next(error);
  }
};
