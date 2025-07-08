import { Chat, Message, prisma, User } from "@repo/db";
import { getMessageListSql } from "@repo/db/sql";
import { ChatMessage } from "@repo/db/models/message";

export const getMessageList = async ({
  userId,
  chatId,
}: {
  userId: User["id"];
  chatId: Chat["id"];
}) => {
  const messagesRaw = await prisma.$queryRawTyped(
    getMessageListSql(userId, chatId)
  );

  const grouped = new Map();

  for (const row of messagesRaw) {
    if (!grouped.has(row.messageId)) {
      grouped.set(row.messageId, {
        id: row.messageId,
        text: row.messageText,
        createdAt: row.messageCreatedAt,
        fromUserId: row.messageFromUserId,
        chatId: row.messageChatId,
        fromUser: {
          id: row.userId,
          name: row.userName,
        },
      });
    }
  }

  const messages: ChatMessage[] = Array.from(grouped.values());

  return messages;
};

export const addMessage = async ({
  text,
  chatId,
  fromUserId,
}: Pick<Message, "text" | "chatId" | "fromUserId">) => {
  const message = await prisma.message.create({
    data: { text, chatId, fromUserId },
    include: {
      fromUser: {
        select: { id: true, name: true },
      },
    },
  });

  return message;
};

export const ackMessage = async ({
  userId,
  chatId,
  messageId,
}: {
  userId: string;
  chatId: Chat["id"];
  messageId: Message["id"];
}) => {
  const message = await prisma.userChat.update({
    where: {
      userId_chatId: { userId, chatId },
    },
    data: {
      clientOffset: messageId,
    },
  });

  return message;
};
