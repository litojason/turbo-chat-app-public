import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    omit: { user: { token: true, password: true } },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
