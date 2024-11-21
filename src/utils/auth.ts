import { JWT_TYPE_ENUM } from "@/lib/constants/enums/common.enum";
import connectDB from "@/lib/dbConnect";
import { generateToken, verifyToken } from "@/lib/utils/auth/jwt.utils";
import { getUserById } from "@/services/user.service";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromToken() {
  try {
    await connectDB();
    const cookie = await cookies();
    const token = cookie.get("accessToken");
    const rememberMe = cookie.get("rememberMe");



    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = await verifyToken(token.value, JWT_TYPE_ENUM.ACCESS) as JwtPayload;

    if (!decodedToken) {
      throw new Error("Invalid token");
    }


    const user = await getUserById(decodedToken.userId);

    

    if (!user) {
      throw new Error("User not found");
    }


    if (rememberMe) {
      cookie.set("rememberMe", rememberMe.value, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      const accessToken = generateToken({userId: user._id.toString()}, JWT_TYPE_ENUM.ACCESS);
      
      const refreshToken = generateToken({userId: user._id.toString()}, JWT_TYPE_ENUM.REFRESH);

      cookie.set("accessToken", accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      cookie.set("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return { user, tokenExpiry: decodedToken.exp };
  } catch (_error: unknown) {
    return { user: null, tokenExpiry: null };
  }
}
