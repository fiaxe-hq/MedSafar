import { NextResponse, type NextRequest } from "next/server";
import { defaultLanguage, languageCodes, retiredCodes } from "@/lib/i18n/languages";
import { placeForIso, placeSlugs } from "@/content/places";

/**
 * Language comes from the address: /bn/treatments is Bengali, /treatments is
 * English (served from /en/treatments behind the scenes).
 *
 * Country only changes the home page's photo. It is the one picked in the
 * country picker (?country=bd, remembered in the "place" cookie), or else the
 * one Cloudflare found from the visitor's IP address. Each language and
 * country pair is its own static page, /<lang>/home/<country>.
 */
const month = 60 * 60 * 24 * 30;

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const parts = url.pathname.split("/");
  const first = parts[1] ?? "";

  // The country picker: remember the choice, then show the page without the query.
  const picked = url.searchParams.get("country");
  if (picked !== null) {
    url.searchParams.delete("country");
    const response = NextResponse.redirect(url);
    if (placeSlugs.includes(picked)) response.cookies.set("place", picked, { path: "/", maxAge: month * 12, sameSite: "lax" });
    return response;
  }

  // English has no prefix: /en/about becomes /about.
  if (first === defaultLanguage) {
    url.pathname = url.pathname.slice(defaultLanguage.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // A language no longer offered: the same page in English.
  if (retiredCodes.includes(first)) {
    url.pathname = `/${parts.slice(2).join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  const hasLang = languageCodes.includes(first);

  // The old country pages, /ng and the rest: the home page for that country.
  if (!hasLang && parts.length === 2 && first !== "global" && placeSlugs.includes(first)) {
    url.pathname = "/";
    url.searchParams.set("country", first);
    return NextResponse.redirect(url);
  }
  const lang = hasLang ? first : defaultLanguage;
  const rest = hasLang ? `/${parts.slice(2).join("/")}` : url.pathname;

  // The internal home addresses are not for visiting directly.
  if (rest.startsWith("/home/") || rest === "/home") {
    url.pathname = lang === defaultLanguage ? "/" : `/${lang}`;
    return NextResponse.redirect(url);
  }

  // Cloudflare's country for the IP address; "XX" and "T1" mean unknown.
  const header = request.headers.get("cf-ipcountry")?.toUpperCase();
  const ipIso = header && /^[A-Z]{2}$/.test(header) && header !== "XX" && header !== "T1" ? header : undefined;
  // Failing that, the country the browser's location prompt found.
  const ownIso = ipIso ?? request.cookies.get("country")?.value;
  const chosen = request.cookies.get("place")?.value;
  const place = chosen && placeSlugs.includes(chosen) ? chosen : placeForIso(ownIso);

  const target = url.clone();
  target.pathname = rest === "/" || rest === "" ? `/${lang}/home/${place}` : `/${lang}${rest}`;
  const response = NextResponse.rewrite(target);

  // The visitor's own country, for the phone field and the header flag.
  if (ipIso && request.cookies.get("country")?.value !== ipIso) {
    response.cookies.set("country", ipIso, { path: "/", maxAge: month, sameSite: "lax" });
  }
  return response;
}

export const config = {
  // Everything except Next's own files, the admin panel and files with an
  // extension (images, sitemap.xml, i18n/*.json).
  matcher: ["/((?!api|_next|admin|.*\\..*).*)"],
};
