import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function redirectFn(request: NextRequest) {
  return (path?: string) =>
    NextResponse.redirect(new URL(path ?? "/", request.url));
}

/**
 * Lucia configured with Prisma cannot interact directly via server function because
 * Prisma is not configured to run with edge runtime. Therefore, we need to have a API
 * route, to let Prisma integrate with NodeJS env there.
 * @param request Next request.
 */
export async function middleware(request: NextRequest) {
  const redirect = redirectFn(request);

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

    if (request.nextUrl.pathname.startsWith("/library")) {
      if (user == null) {
        return redirect();
      }
      return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (user?.role !== "admin") {
        return redirect();
      }
      return NextResponse.next();
    }

    // If the user is valid and authorized, proceed
    return NextResponse.next();
  } catch (error) {
    return redirect(); // Redirect on validation failure
  }
}

export const config = {
  matcher: ["/admin/:path*", "/library"],
};
