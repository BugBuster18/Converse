import { PrismaClient } from "@/app/generated/prisma/client";
import { adapter } from "./prismaAdapter";

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}

export default prisma;