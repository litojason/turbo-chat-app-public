import { ChatType, PrismaClient, User } from "../../generated/prisma";

const prisma = new PrismaClient();

/**
 * Scenario 1:
 * Private chat between John Doe and Jane Smith
 * No message yet
 */
export const privateOne = async (members: User[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  await prisma.chat.create({
    data: {
      name: members[1]!.name,
      chatType: ChatType.PRIVATE,
      users: {
        create: mapMembers,
      },
    },
  });
};

/**
 * Scenario 2:
 * Private chat between John Doe and Jane Smith
 * Last message by John Doe
 * Jane Smith have read the message
 */
export const privateTwo = async (members: User[], memberIds: string[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  const chat = await prisma.chat.create({
    data: {
      name: members[1]!.name,
      chatType: ChatType.PRIVATE,
      users: {
        create: mapMembers,
      },
    },
  });

  const message = await prisma.message.create({
    data: {
      text: "Hello from John",
      fromUserId: memberIds[0]!,
      chatId: chat.id,
    },
  });

  await prisma.userChat.update({
    where: {
      userId_chatId: {
        userId: memberIds[1]!,
        chatId: chat.id,
      },
    },
    data: { clientOffset: message.id },
  });
};

/**
 * Scenario 3:
 * Private chat between John Doe and Jane Smith
 * Last message by Jane Smith
 * John Doe have not read the message
 */
export const privateThree = async (members: User[], memberIds: string[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  const chat = await prisma.chat.create({
    data: {
      name: members[1]!.name,
      chatType: ChatType.PRIVATE,
      users: {
        create: mapMembers,
      },
    },
  });

  await prisma.message.create({
    data: {
      text: "Hello from Jane",
      fromUserId: memberIds[1]!,
      chatId: chat.id,
    },
  });
};

/**
 * Scenario 4:
 * Private chat between John Doe and Jane Smith
 * Last message by Jane Smith
 * John Doe have read the message
 */
export const privateFour = async (members: User[], memberIds: string[]) => {
  const mapMembers = members.map((member) => ({
    user: { connect: { id: member.id } },
  }));

  const chat = await prisma.chat.create({
    data: {
      name: members[1]!.name,
      chatType: ChatType.PRIVATE,
      users: {
        create: mapMembers,
      },
    },
  });

  const message = await prisma.message.create({
    data: {
      text: "Hello from Jane",
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
