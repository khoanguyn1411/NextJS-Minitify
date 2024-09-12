"use server";

import { appPrisma } from "@/shared/configs/prisma.config";
import { PasswordEncryption } from "@/shared/utils/encryptPassword";
import { buildAppError, validateWithSchema } from "@/shared/utils/errorHandlers";

import { RegisterData } from "../models/registerData";

export async function createUser(data: RegisterData.Type) {
  return validateWithSchema({
    data: data,
    schema: RegisterData.schema,
    async onPassed(data) {
      const hashedPassword = await PasswordEncryption.hashPassword(
        data.password
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
