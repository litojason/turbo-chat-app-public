"use server";

import client from "~/lib/client";
import { ChatDetails, ChatListItem } from "@repo/db/models/chat";
import { Chat } from "@repo/db";
import { ChatMessage } from "@repo/db/models/message";

type GetChatsResponse = {
  message: string;
  chats: ChatListItem[];
};
export const getChats = async () => {
  const resData = await client.get<GetChatsResponse>("/chats");

  return resData.chats;
};

type GetChatMessagesResponse = {
  message: string;
  messages: ChatMessage[];
};
export const getChatMessages = async (id: Chat["id"]) => {
  const resData = await client.get<GetChatMessagesResponse>(
    `/chats/${id}/messages`
  );

  return resData.messages;
};

type GetChatByIdResponse = {
  message: string;
  chat: ChatDetails;
};
export const getChatById = async (id: Chat["id"]) => {
  const resData = await client.get<GetChatByIdResponse>(`/chats/${id}`);

  return resData.chat;
};

type DeleteChatResponse = {
  message: string;
  chat: Chat;
};
export const deleteChat = async (id: Chat["id"]) => {
  const resData = await client.delete<DeleteChatResponse>(`/chats/${id}`);

  return resData.chat;
};
