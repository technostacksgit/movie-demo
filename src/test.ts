// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get("accessToken");

//   if (
//     accessToken &&
//     (pathname.startsWith("/login") || pathname.startsWith("/register"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
//   }

//   // Exclude static files, API routes, and authentication pages
//   if (
//     pathname.startsWith("/login") || 
//     pathname.startsWith("/register") ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/static")
//   ) {
//     return NextResponse.next();
//   }


//   if (!accessToken) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
//   }

//   // Allow the request to proceed if accessToken is present
//   return NextResponse.next();
// }
