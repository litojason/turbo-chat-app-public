import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Prisma, User } from "../../generated/prisma";

export const userSchema = z.object({
  name: z.string(),
  id: z.string(),
  email: z.string(),
  password: z.string(),
  about: z.string().nullable(),
  token: z.string().nullable(),
  isOnline: z.boolean(),
  lastSeen: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.Schema<User>;

const loginFormSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email." }),
  password: z.string().trim().nonempty({ message: "Password is required." }),
});
export const loginFormResolver = zodResolver(loginFormSchema);
export type LoginFormData = z.infer<typeof loginFormSchema>;

const createUserSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email." }),
  name: z
    .string()
    .trim()
    .min(2, "Name must be minimum 2 characters long.")
    .nonempty({ message: "Name is required." }),
  password: z
    .string()
    .trim()
    .nonempty({ message: "Password is required." })
    .min(6, "Password must be minimum 6 characters long."),
}) satisfies z.Schema<Prisma.UserCreateInput>;

const registerFormSchema = createUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password do not match.",
        path: ["confirmPassword"],
      });
    }
  });
export const registerFormResolver = zodResolver(registerFormSchema);
export type RegisterFormData = z.infer<typeof registerFormSchema>;

const editProfileFormSchema = userSchema.pick({ name: true, about: true });
export const editProfileFormResolver = zodResolver(editProfileFormSchema);
export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;
