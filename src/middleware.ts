import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only gate /app routes
  if (!pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  // Bypass gate if env flag is set
  if (process.env.DALBIT_BYPASS_CODE === "true") {
    return NextResponse.next();
  }

  // Check for access cookie
  const accessCookie = request.cookies.get("dalbit_access")?.value;

  // Validate cookie matches DALBIT-XXXXX format (5 uppercase alphanumeric chars)
  if (accessCookie && /^DALBIT-[A-Z0-9]{5}$/.test(accessCookie)) {
    return NextResponse.next();
  }

  // No valid cookie — redirect to /start
  const startUrl = request.nextUrl.clone();
  startUrl.pathname = "/start";
  return NextResponse.redirect(startUrl);
}

export const config = {
  matcher: ["/app/:path*"],
};
