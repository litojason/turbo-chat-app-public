import { ChatType, Message, PrismaClient, User } from "../../generated/prisma";

const prisma = new PrismaClient();

/**
 * Scenario 1:
 * Group chat, 3 members created by John Doe
 * No message yet
 */
export const groupOne = async (members: User[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  await prisma.chat.create({
    data: {
      name: "First Group",
      chatType: ChatType.GROUP,
      users: {
        create: mapMembers,
      },
    },
  });
};

/**
 * Scenario 2:
 * Group chat, 3 members created by John Doe
 * Last message by John Doe
 * Jane Smith and Test have read the message
 */
export const groupTwo = async (members: User[], memberIds: string[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  const chat = await prisma.chat.create({
    data: {
      name: "Second Group",
      chatType: ChatType.GROUP,
      users: {
        create: mapMembers,
      },
    },
  });

  const message = await prisma.message.create({
    data: {
      text: "Group from John",
      fromUserId: memberIds[0]!,
      chatId: chat.id,
    },
  });

  const userIds = [memberIds[1]!, memberIds[2]!];

  for (const userId of userIds) {
    await prisma.userChat.update({
      where: {
        userId_chatId: {
          userId,
          chatId: chat.id,
        },
      },
      data: { clientOffset: message.id },
    });
  }
};

/**
 * Scenario 3:
 * Group chat, 3 members created by Jane Smith
 * Last message by Jane Smith
 * John Doe and Test have not read the message
 */
export const groupThree = async (members: User[], memberIds: string[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  const chat = await prisma.chat.create({
    data: {
      name: "Third Group",
      chatType: ChatType.GROUP,
      users: {
        create: mapMembers,
      },
    },
  });

  await prisma.message.create({
    data: {
      text: "Group from Jane",
      fromUserId: memberIds[1]!,
      chatId: chat.id,
    },
  });
};

/**
 * Scenario 4:
 * Group chat, 3 members created by Jane Smith
 * Last message by Jane Smith
 * John Doe have read the message
 * Test have not read the message
 */
export const groupFour = async (members: User[], memberIds: string[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  const chat = await prisma.chat.create({
    data: {
      name: "Fourth Group",
      chatType: ChatType.GROUP,
      users: {
        create: mapMembers,
      },
    },
  });

  const message = await prisma.message.create({
    data: {
      text: "Group from Jane",
      fromUserId: memberIds[1]!,
      chatId: chat.id,
    },
  });

  await prisma.userChat.update({
    where: {
      userId_chatId: {
        userId: memberIds[0]!,
        chatId: chat.id,
      },
    },
    data: { clientOffset: message.id },
  });
};

/**
 * Scenario 5:
 * Group chat, 3 members created by Jane Smith
 * 3 messages from Jane Smith
 * Last message by Jane Smith
 * John Doe have read message 1 & 2 but not 3
 * Test have not read the message
 */
export const groupFive = async (members: User[], memberIds: string[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  const chat = await prisma.chat.create({
    data: {
      name: "Fifth Group",
      chatType: ChatType.GROUP,
      users: {
        create: mapMembers,
      },
    },
  });

  await prisma.message.create({
    data: {
      text: "Read Jane 1",
      fromUserId: memberIds[1]!,
      chatId: chat.id,
    },
  });

  const lastMessageRead = await prisma.message.create({
    data: {
      text: "Read Jane 2",
      fromUserId: memberIds[1]!,
      chatId: chat.id,
    },
  });

  await prisma.message.create({
    data: {
      text: "Unread Jane 3",
      fromUserId: memberIds[1]!,
      chatId: chat.id,
    },
  });

  await prisma.userChat.update({
    where: {
      userId_chatId: {
        userId: memberIds[0]!,
        chatId: chat.id,
      },
    },
    data: { clientOffset: lastMessageRead.id },
  });
};
