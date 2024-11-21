// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleError } from "@/lib/errorHandler";

export async function POST() {
  const cookieStore = await cookies();

  try {
    // Clear all authentication cookies
    const authCookies = ["accessToken", "refreshToken", "rememberMe"];

    authCookies.forEach((cookieName) => {
      // First try to get the cookie
      const cookie = cookieStore.get(cookieName);

      if (cookie) {
        // Set the cookie with an expired date
        cookieStore.set(cookieName, "", {
          httpOnly: true,
          sameSite: "lax" as const,
          path: "/",
          expires: new Date(0),
        });
      }
    });

    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error)
  }
}
