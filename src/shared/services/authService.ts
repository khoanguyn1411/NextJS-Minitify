"use server";

import { type User, type Session } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

import { lucia } from "@/shared/configs/lucia.config";

import { createUser } from "../../core/apis/usersApis";
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
