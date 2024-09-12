"use server";

import { type User } from "@prisma/client";

import { appPrisma } from "@/shared/configs/prisma.config";
import { PasswordEncryption } from "@/shared/utils/encryptPassword";
import {
  buildAppError,
  validateWithSchema,
} from "@/shared/utils/errorHandlers";

import { RegisterData } from "../models/registerData";

export async function createUser(data: RegisterData.Type) {
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
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      });
      return user;
    },
  });
}

export async function getUserProfile({
  id,
  username,
  password,
}: {
  readonly id?: User["id"];
  readonly username?: User["username"];
  readonly password?: User["password"];
}) {
  const user = await appPrisma.user.findUnique({
    where: {
      id,
      username,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
    },
  });

  if (password != null) {
  }

  return user;
}
