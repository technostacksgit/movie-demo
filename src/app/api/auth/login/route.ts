import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import { loginSchema } from '@/lib/validations/auth/auth.validation';
import { handleError } from '@/lib/errorHandler';
import { getUserByEmail } from '@/services/user.service';
import { generateToken } from '@/lib/utils/auth/jwt.utils';
import { JWT_TYPE_ENUM } from '@/lib/constants/enums/common.enum';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await req.json();
    const parsedBody = loginSchema.parse(reqBody);
    const { email, password, rememberMe } = parsedBody;

    // Check if user exists
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    // Compare passwords
    const isMatch = await bcrypt.compare(password, userPassword);
    const cookieStore = await cookies();

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 400 },
      )
    }

    // Generate access and refresh token based on remember me
    if (rememberMe) {
      // Update remember me
      cookieStore.set('rememberMe', 'true');      
    }

    // Generate a new access token and ref token
    const accessToken = generateToken({userId: userWithoutPassword._id.toString()}, JWT_TYPE_ENUM.ACCESS);
    const refreshToken = rememberMe && generateToken({ userId: userWithoutPassword._id.toString() }, JWT_TYPE_ENUM.REFRESH)
    
    // Successful login
    cookieStore.set('accessToken', accessToken);

    if(refreshToken){
      cookieStore.set('refreshToken', refreshToken);
    }
    return NextResponse.json(
      { success: true, message: 'Login successful', data: {user: userWithoutPassword, accessToken, refreshToken} },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
