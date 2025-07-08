import { NextFunction, Request, Response } from "express";

import { Chat, Message, prisma } from "@repo/db";
import {
  deleteUserChat,
  getChatDetails,
  getChatList,
  getChatListWithRawQuery,
} from "../services/chat";
import { CustomError } from "../middlewares/errors";
import { getMessageList } from "../services/message";

export const getAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chats = await prisma.chat.findMany();

    res.status(200).json({
      message: "Get all chats successful.",
      chats,
    });
  } catch (error) {
    next(error);
  }
};

export const getChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  if (!userId) {
    res.status(400).json({ message: "User not found." });
    return;
  }

  try {
    const chats = await getChatList(userId);

    res.status(200).json({
      message: "Get chats successful.",
      chats,
    });
  } catch (error) {
    next(error);
  }
};

export const getChatsWithRawQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  if (!userId) {
    res.status(400).json({ message: "User not found." });
    return;
  }

  try {
    const chats = await getChatListWithRawQuery(userId);

    res.status(200).json({
      message: "Get chats successful.",
      chats,
    });
  } catch (error) {
    next(error);
  }
};

export const getChatById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { chatId } = req.params as { chatId: Chat["id"] };

  try {
    const chat = await getChatDetails(chatId, userId!);

    res.status(200).json({
      message: "Get chat by id successful.",
      chat,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { chatId } = req.params as { chatId: string };

  try {
    const existedChat = await prisma.userChat.findUnique({
      where: {
        userId_chatId: {
          userId: userId!,
          chatId: chatId,
        },
      },
    });

    if (!existedChat) {
      throw new CustomError(404, "Chat not found.");
    }

    const deletedChat = await deleteUserChat(chatId, userId!);

    res.status(200).json({
      message: "Delete chat successful.",
      chat: deletedChat,
    });
  } catch (error) {
    next(error);
  }
};

export const getChatMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { chatId } = req.params as { chatId: Chat["id"] };

  try {
    const messages = await getMessageList({ userId: userId!, chatId });

    res.status(200).json({
      message: "Get messages successful.",
      messages,
    });
  } catch (error) {
    next(error);
  }
};

export const postMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { chatId } = req.params as { chatId: string };
  const { text } = req.body as Message;

  try {
    const message = await prisma.message.create({
      data: { text, chatId, fromUserId: userId! },
    });

    res.status(200).json({
      message: "Post message successful.",
      newMessage: message,
    });
  } catch (error) {
    next(error);
  }
};
