import { appPrisma } from "../configs/prisma.config";

export async function createPrismaRequest<T>(callback: () => T) {
  try {
    return await callback();
  } finally {
    appPrisma.$disconnect();
  }
}
