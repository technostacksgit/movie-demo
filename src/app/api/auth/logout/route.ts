// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleError } from "@/lib/errorHandler";

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the user by clearing all authentication-related cookies.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: The error message.
 */

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
