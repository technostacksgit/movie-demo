import dbConnect from "@/lib/dbConnect";
import { registerSchema } from "@/lib/validations/auth/auth.validation";
import { IUser } from "@/models/user";
import { createUser, getUserByEmail } from "@/services/user.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from 'next/headers';
import { generateToken } from "@/lib/utils/auth/jwt.utils";
import { JWT_TYPE_ENUM } from "@/lib/constants/enums/common.enum";

export async function POST(req: Request) {
  await dbConnect();
  const reqBody = await req.json();
  const parsedBody = registerSchema.parse(reqBody);
  const cookieStore = await cookies();

  const { email, password, confirmPassword } = parsedBody;

  if (password !== confirmPassword) {
    return NextResponse.json(
      { success: false, message: "Passwords do not match" },
      { status: 400 }
    );
  }

  // Check if user already exists
  const user = await getUserByEmail(email);
  if (user) {
    return NextResponse.json(
      { success: false, message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    email,
    password: hashedPassword,
  } as IUser);

  // Generate a new access token and ref token
  const accessToken = generateToken(
    { userId: newUser._id.toString() },
    JWT_TYPE_ENUM.ACCESS
  );
  const refreshToken = generateToken(
      { userId: newUser._id.toString() },
      JWT_TYPE_ENUM.REFRESH
    );

  // Successful login
  cookieStore.set("accessToken", accessToken);
  cookieStore.set('refreshToken', refreshToken);

  return NextResponse.json({
    success: true,
    message: "User created successfully",
    data: { user: newUser },
  });
}
