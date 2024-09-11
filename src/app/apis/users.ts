"use server";

import { type RegisterData } from "@/core/models/registerData";
import { appPrisma } from "@/shared/configs/prisma.config";
import { PasswordEncryption } from "@/shared/utils/passwordEncryption";

export async function createUser(data: RegisterData) {
  const hashedPassword = await PasswordEncryption.hashPassword(data.password);
  await appPrisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.userName, 
      password: hashedPassword,
    },
  });
}
