import { Socket } from "socket.io";

import { User } from "@repo/db";
import { userRoom } from "../lib/room";
import { searchUsers } from "../services/user";

export function userJoin({ socket }: { socket: Socket }) {
  return async (
    { userId }: { userId: string },
    callback: (res: { status: string }) => void
  ) => {
    if (typeof callback !== "function") return;

    socket.join(userRoom(userId));

    callback({ status: "OK" });
  };
}

export function userSearch({ socket }: { socket: Socket }) {
  return async (
    { userId, term }: { userId: string; term: string },
    callback: (res: { status: string; users: User[] }) => void
  ) => {
    if (typeof callback !== "function") return;

    const users = await searchUsers({ userId, term });

    callback({ status: "OK", users });
  };
}
