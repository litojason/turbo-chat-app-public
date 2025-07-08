"use server";

import { redirect } from "next/navigation";

import client from "~/lib/client";
import { deleteToken, setToken } from "~/lib/cookies";
import { User } from "@repo/db";
import {
  EditProfileFormData,
  LoginFormData,
  RegisterFormData,
} from "@repo/db/models/user";

type LoginResponse = {
  message: string;
  user: User;
};
export const postLogin = async (data: LoginFormData) => {
  const resData = await client.post<LoginFormData, LoginResponse>(
    "/users/login",
    data
  );

  if (resData.user.token) await setToken(resData.user.token);

  return resData.user;
};

type RegisterResponse = {
  message: string;
  user: User;
};
export const postRegister = async (data: RegisterFormData) => {
  const resData = await client.post<RegisterFormData, RegisterResponse>(
    "/users/register",
    data
  );

  return resData.user;
};

export const logout = async () => {
  await deleteToken();
  redirect("/login");
};

type GetProfileResponse = {
  message: string;
  profile: User;
};
export const getProfile = async () => {
  const resData = await client.get<GetProfileResponse>("/users/profile");

  return resData.profile;
};

type EditProfileResponse = {
  message: string;
  profile: User;
};
export const editProfile = async (data: EditProfileFormData) => {
  const resData = await client.put<EditProfileFormData, EditProfileResponse>(
    "/users/profile",
    data
  );

  return resData.profile;
};
