"use client";

import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_URL;

console.log("URL", URL);

export const socket = io(URL, {
  //   timeout: 10000,
});
