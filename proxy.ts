import { NextResponse, type NextRequest } from "next/server";

/**
 * Remembers the visitor's country, from the header Cloudflare adds to every
 * request, in a cookie the header's flag can read. The pages themselves stay
 * static: nothing on the server changes per country.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const country = request.headers.get("cf-ipcountry")?.toUpperCase();
  if (country && /^[A-Z]{2}$/.test(country) && request.cookies.get("country")?.value !== country) {
    response.cookies.set("country", country, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|admin|.*\..*).*)"],
};
