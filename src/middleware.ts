import { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";

const nextIntlMiddleware = createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "es",
});

export default function middleware(req: NextRequest): Response {
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/",
    "/('es'|'en')/:path*",
    "/('es-ES'|'en-UK')/:path*",
  ],
};
