import { appPrisma } from "../configs/prisma.config";

export async function createPrismaRequest<T>(callback: () => Promise<T>) {
  try {
    await callback();
  } finally {
    appPrisma.$disconnect();
  }
}
