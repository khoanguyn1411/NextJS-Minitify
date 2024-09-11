import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  // Allows us to add a custom property `prisma` to the global object
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// In production, create a new instance of PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to prevent multiple instances of PrismaClient
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const appPrisma = prisma;
