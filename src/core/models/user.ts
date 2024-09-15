import { type User as PrismaUser } from "@prisma/client";

export namespace User {
  export function getFullName(user: { firstName: string; lastName: string }) {
    return `${user.firstName} ${user.lastName}`;
  }

  export function getFirstChar(user: PrismaUser) {
    return `${user.firstName}`.charAt(0);
  }
}
