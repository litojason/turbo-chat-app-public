import { PrismaClient, User } from "../../generated/prisma";
import { createUser } from "./create-user";
import {
  groupOne,
  groupTwo,
  groupThree,
  groupFour,
  groupFive,
} from "./group-scenario";
import {
  privateFour,
  privateOne,
  privateThree,
  privateTwo,
} from "./private-scenario";

const prisma = new PrismaClient();

export async function main() {
  const { johnDoe, janeSmith, test } = await createUser();

  // Group Chats
  const members: User[] = [johnDoe, janeSmith, test];
  const memberIds: string[] = members.map((member) => member.id);

  await groupOne(members);
  await groupTwo(members, memberIds);
  await groupThree(members, memberIds);
  await groupFour(members, memberIds);
  await groupFive(members, memberIds);

  // Private Chats
  const privates: User[] = [johnDoe, janeSmith];
  const privateIds: string[] = privates.map((member) => member.id);

  await privateOne(privates);
  await privateTwo(privates, privateIds);
  await privateThree(privates, privateIds);
  await privateFour(privates, privateIds);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
