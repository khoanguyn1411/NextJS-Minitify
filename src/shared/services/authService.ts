"use server";

import { type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

import { type LoginData } from "@/core/models/loginData";
import { lucia } from "@/shared/configs/lucia.config";

import { createUser, findUser } from "../../core/apis/usersApis";
import { isAppError } from "../../core/models/errors";
import { type RegisterData } from "../../core/models/registerData";
import { PasswordEncryption } from "../utils/encryptPassword";
import { buildAppError } from "../utils/errorHandlers";

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

export async function signIn(data: LoginData.Type) {
  const userToFind = await findUser({
    username: data.userName,
    password: data.password,
  });
  if (isAppError(userToFind)) {
    return userToFind;
  }
  if (userToFind == null) {
    return null;
  }
  const isPasswordCorrect = await PasswordEncryption.verifyPassword(
    data.password,
    userToFind.password,
  );
  if (isPasswordCorrect) {
    const session = await lucia.createSession(userToFind.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return userToFind;
  }
  return buildAppError("Incorrect username or password.");
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (e) {
      throw new Error("There are some error with validation process.");
    }
    return result;
  },
);
