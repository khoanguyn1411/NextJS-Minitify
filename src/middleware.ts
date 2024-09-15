import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Lucia configured with Prisma cannot interact directly via server function because
 * Prisma is not configured to run with edge runtime. Therefore, we need to have a API
 * route, to let Prisma integrate with NodeJS env there.
 * @param request Next request.
 */
export async function middleware(request: NextRequest) {
  try {
    const response = await fetch(
      `${request.nextUrl.origin}/api/auth/validateSession`,
      {
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      },
    );

    const user = await response.json();

    // Check if the user has specific roles or permissions (if needed)
    if (user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If the user is valid and authorized, proceed
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect on validation failure
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
