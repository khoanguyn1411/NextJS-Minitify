import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware Run");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};
