import { PrismaClient } from "../generated/prisma/client.ts";
import { adapter } from "./prismaAdapter.js";  

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}

export default prisma;