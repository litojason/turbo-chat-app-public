"use server";

import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};

export const setToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60, // 1 day, maxAge in seconds
  });
};

export const deleteToken = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
};
