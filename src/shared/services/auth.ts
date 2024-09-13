"use server";

import { cookies } from "next/headers";

import { lucia } from "@/shared/configs/lucia.config";

import { createUser } from "../../core/apis/users";
import { isAppError } from "../../core/models/errors";
import { type RegisterData } from "../../core/models/registerData";

export async function signUp(data: RegisterData.Type) {
  const newUser = await createUser(data);
  if (isAppError(newUser)) {
    return newUser;
  }
  const session = await lucia.createSession(newUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return newUser;
}
