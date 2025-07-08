import { PrismaClient } from "../../generated/prisma";
import { createUser } from "./create-user";

const prisma = new PrismaClient();

export async function main() {
  await createUser();
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
