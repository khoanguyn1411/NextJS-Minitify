"use server";

import { RegisterForm } from "@/shared/components/auth/register/registerForm";
import { appPrisma } from "@/shared/configs/prisma.config";
import { PasswordEncryption } from "@/shared/utils/passwordEncryption";
import { validateWithSchema } from "@/shared/utils/schemaValidator";

export async function createUser(data: RegisterForm.Type) {
  return validateWithSchema({
    data: data,
    schema: RegisterForm.schema,
    async onPassed(data) {
      const hashedPassword = await PasswordEncryption.hashPassword(
        data.password
      );

      // const userWithUsername = await appPrisma.user.findUnique({ where: { username: data.userName } });
      // const isUsernameAlreadyExisted = userWithUsername != null;
      // if(isUsernameAlreadyExisted){
      //   return;
      // }
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
