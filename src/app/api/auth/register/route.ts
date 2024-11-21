import dbConnect from "@/lib/dbConnect";

import { registerSchema } from "@/lib/validations/auth/auth.validation";
import { IUser } from "@/models/user";
import { createUser, getUserByEmail } from "@/services/user.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {



  await dbConnect();
  const reqBody = await req.json();
  const parsedBody = registerSchema.parse(reqBody);

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

  const newUser = await createUser({ email, password: hashedPassword } as IUser);

  return NextResponse.json({
    success: true,
    message: "User created successfully",
    data: { user: newUser },
  });
}
