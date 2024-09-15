import { NextResponse } from "next/server";

import { validateRequest } from "@/shared/services/authService";

/**
 * For middleware usage. Because Lucia configured with Prisma cannot interact directly in middleware.
 * Need to have a API as a intermediate service to integrate.
 */
export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    return NextResponse.json({
      userId: user.id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Session validation failed" },
      { status: 500 },
    );
  }
}
