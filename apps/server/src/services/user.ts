import { prisma, User } from "@repo/db";

export const searchUsers = async ({
  userId,
  term,
}: {
  userId: User["id"];
  term: string;
}) => {
  const users = await prisma.user.findMany({
    where: {
      id: { not: userId },
      email: { contains: term },
    },
    take: 3,
  });

  return users;
};
