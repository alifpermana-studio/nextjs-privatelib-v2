import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/* export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.redirect(new URL("/Denied", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/clientimgv2")) {
      return NextResponse.redirect(new URL("/enter", req.url));
    }
    return NextResponse.next();
  }
); */

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/clientimgv2")) {
    return NextResponse.redirect(new URL("/enter", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/clientimgv2"] };

/* export { default } from "next-auth/middleware";

export const config = { matcher: ["/clientimgv2"] }; */
