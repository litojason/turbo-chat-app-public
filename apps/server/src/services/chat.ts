import { Chat, ChatType, prisma, User } from "@repo/db";
import { ChatDetails, ChatListItem } from "@repo/db/models/chat";
import { getChatListSql } from "@repo/db/sql";
import { CustomError } from "../middlewares/errors";

/**
 * Currently using raw query below (getChatListWithRawQuery) instead of using this function.
 * Since the idea is to sort/orderBy chat list with latest message on top,
 * but seems like prisma has not support this behavior.
 * Ex. orderBy: {
      chat: {
        messages: {
          createdAt: "desc", --> like so? Or maybe other workaround?
        },
      },
    },
 */
export const getChatList = async (userId: User["id"]) => {
  const userChats = await prisma.userChat.findMany({
    where: { userId },
    select: {
      clientOffset: true,
      chat: {
        include: {
          users: {
            where: {
              userId: { not: userId },
            },
            select: {
              user: {
                select: { id: true, name: true },
              },
            },
          },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              id: true,
              text: true,
              fromUser: {
                select: { id: true, name: true },
              },
              createdAt: true,
            },
          },
        },
      },
    },
  });

  const chats: ChatListItem[] = userChats.map((userChat) => {
    const { chat, clientOffset } = userChat;

    return {
      ...chat,
      clientOffset,
      users: undefined,
      otherUser:
        chat.chatType === ChatType.PRIVATE ? chat.users[0]?.user : undefined,
    };
  });

  return chats;
};

export const getChatListWithRawQuery = async (userId: User["id"]) => {
  const chatsRaw = await prisma.$queryRawTyped(getChatListSql(userId, userId));

  const grouped = new Map();

  for (const row of chatsRaw) {
    if (!grouped.has(row.chatId)) {
      grouped.set(row.chatId, {
        id: row.chatId,
        name:
          row.chatType === ChatType.PRIVATE ? row.otherUserName : row.chatName,
        chatType: row.chatType,
        createdAt: row.chatCreatedAt,
        updatedAt: row.chatUpdatedAt,
        messages: [],
        clientOffset: row.clientOffset,
        otherUser: {
          id: row.otherUserId,
          name: row.otherUserName,
        },
      });
    }

    const isMessageVisible =
      !row.userChatDeletedAt ||
      (row.messageCreatedAt && row.userChatDeletedAt < row.messageCreatedAt);

    if (row.messageId && isMessageVisible) {
      grouped.get(row.chatId).messages.push({
        id: row.messageId,
        text: row.text,
        fromUser: {
          id: row.fromUserId,
          name: row.fromUserName,
        },
        createdAt: row.messageCreatedAt,
      });
    }
  }

  const chats: ChatListItem[] = Array.from(grouped.values());

  return chats;
};

export const getPrivateChat = async ({
  userId,
  otherUserId,
}: {
  userId: User["id"];
  otherUserId: User["id"];
}) => {
  const existedChat = await prisma.chat.findFirst({
    where: {
      chatType: ChatType.PRIVATE,
      users: {
        every: {
          userId: {
            in: [userId, otherUserId],
          },
        },
      },
    },
  });

  return existedChat;
};

export const addPrivateChat = async ({
  name,
  userId,
  otherUserId,
}: {
  name: string;
  userId: User["id"];
  otherUserId: User["id"];
}) => {
  const mapUserIds = [userId, otherUserId].map((id) => ({
    user: { connect: { id } },
  }));

  const privateChat = await prisma.chat.create({
    data: {
      name,
      chatType: ChatType.PRIVATE,
      users: {
        create: mapUserIds,
      },
    },
    include: {
      users: {
        select: {
          user: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  return { ...privateChat, messages: [] };
};

export const addGroupChat = async ({
  name,
  userId,
  userIds,
}: {
  name: string;
  userId: User["id"];
  userIds: User["id"][];
}) => {
  const mapUserIds = [userId, ...userIds].map((id) => ({
    user: { connect: { id } },
  }));

  const groupChat = await prisma.chat.create({
    data: {
      name,
      chatType: ChatType.GROUP,
      users: {
        create: mapUserIds,
      },
    },
  });

  return { ...groupChat, messages: [] };
};

export const getChatDetails = async (id: Chat["id"], userId: User["id"]) => {
  const chat = await prisma.chat.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              about: true,
            },
          },
        },
      },
    },
  });

  if (!chat) {
    throw new CustomError(404, "Chat not found.");
  }

  const filteredUsers =
    chat.chatType === ChatType.PRIVATE
      ? chat.users.filter((user) => user.user.id !== userId)
      : chat.users;

  const mapChat = {
    ...chat,
    users: filteredUsers.map((user) => ({
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      about: user.user.about,
    })),
  };

  return mapChat as ChatDetails;
};

export const deleteUserChat = async (id: Chat["id"], userId: User["id"]) => {
  const deleted = await prisma.userChat.update({
    where: {
      userId_chatId: { userId, chatId: id },
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return deleted;
};
