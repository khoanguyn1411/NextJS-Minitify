"use server";

import { type User } from "@prisma/client";

import { appPrisma } from "@/shared/configs/prisma.config";
import { PasswordEncryption } from "@/shared/utils/encryptPassword";
import {
  buildAppError,
  validateWithSchema,
} from "@/shared/utils/errorHandlers";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";

import { RegisterData } from "../models/registerData";

export async function createUser(data: RegisterData.Type) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: RegisterData.schema,
      async onPassed(data) {
        const hashedPassword = await PasswordEncryption.hashPassword(
          data.password,
        );

        const userWithUsername = await appPrisma.user.findUnique({
          where: { username: data.userName },
        });
        const isUsernameAlreadyExisted = userWithUsername != null;
        if (isUsernameAlreadyExisted) {
          return buildAppError("Username already exist");
        }
        const user = await appPrisma.user.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.userName,
            password: hashedPassword,
          },
        });
        return user;
      },
    });
  });
}

export async function findUser(user: Partial<User>) {
  return createPrismaRequest(async () => {
    const userToFind = await appPrisma.user.findUnique({
      where: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        createdDate: user.createdDate,
        updatedAt: user.updatedAt,
      },
    });
    return userToFind;
  });
}
