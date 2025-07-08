import bcrypt from "bcryptjs";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export async function createUser() {
  const johnDoe = await prisma.user.create({
    data: {
      email: "johndoe@gmail.com",
      name: "John Doe",
      password: hashPassword("123456"),
      about: "Hi, I am John Doe",
    },
  });

  const janeSmith = await prisma.user.create({
    data: {
      email: "janesmith@gmail.com",
      name: "Jane Smith",
      password: hashPassword("123456"),
      about: "Hi, I am Jane Smith",
    },
  });

  const test = await prisma.user.create({
    data: {
      email: "test@gmail.com",
      name: "Test",
      password: hashPassword("123456"),
    },
  });

  const users = Array.from({ length: 10 }, (_, i) => ({
    email: `test${i + 1}@gmail.com`,
    name: `Test ${i + 1}`,
    password: hashPassword("123456"),
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  return { johnDoe, janeSmith, test };
}
