import { type User as PrismaUser } from "@prisma/client";

export namespace User {
  export function getFullName(user: PrismaUser) {
    return `${user.firstName} ${user.lastName}`;
  }
}
