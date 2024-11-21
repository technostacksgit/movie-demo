import { IUser } from "@/models/user";
import { getUserById } from "@/services/user.service";
import { cookies } from "next/headers";
import { JWT_TYPE_ENUM } from "../constants/enums/common.enum";
import CustomError from "../customError";
import dbConnect from "../dbConnect";
import { verifyToken } from "../utils/auth/jwt.utils";

// Middleware function to authenticate and validate the token
export async function authGuard(): Promise<IUser> {
  // Connect to db.
  await dbConnect();

  // Step 1: Extract the token from the cookies
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;

  if (!token) {
    throw new CustomError("Access token is missing or invalid.", 400, true);
  }
  // Step 2: Verify the JWT Token
  const decode = verifyToken(token, JWT_TYPE_ENUM.ACCESS);

  if (!decode) {
    throw new CustomError("Invalid token.", 400, true);
  }

  // if (decode.exp < new Date()) {
  //   throw new CustomError('Token expired.', 400, true)
  // }

  // Step 3: Check if the user exists in the database
  const user = await getUserById(decode.userId);

  if (!user) {
    throw new CustomError("User not found", 404, true);
  }

  return user;
}
