import { Socket } from "socket.io";

import { Chat, Message } from "@repo/db";
import { chatRoom } from "../lib/room";
import { ChatMessage, MessagePayload } from "@repo/db/models/message";
import { ackMessage, addMessage, getMessageList } from "../services/message";

export function messageList({ socket }: { socket: Socket }) {
  return async (
    { userId, chatId }: { userId: string; chatId: string },
    callback: (res: { status: string; messages: ChatMessage[] }) => void
  ) => {
    if (typeof callback !== "function") return;

    const messages = await getMessageList({ userId, chatId });

    callback({ status: "OK", messages });
  };
}

export function postMessage({ socket }: { socket: Socket }) {
  return async (
    { text, chatId, fromUserId }: { userId: string } & MessagePayload,
    callback: (res: { status: string; message: ChatMessage }) => void
  ) => {
    if (typeof callback !== "function") return;

    const message = await addMessage({ text, chatId, fromUserId });

    callback({ status: "OK", message });

    socket.broadcast.to(chatRoom(chatId)).emit("message:sent", message);
  };
}

export function messageAck({ socket }: { socket: Socket }) {
  return async (
    {
      userId,
      chatId,
      messageId,
    }: {
      userId: string;
      chatId: Chat["id"];
      messageId: Message["id"];
    },
    callback: (res: { status: string }) => void
  ) => {
    if (typeof callback !== "function") return;

    ackMessage({ userId, chatId, messageId });

    callback({ status: "OK" });
  };
}
