import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import { loginSchema } from '@/lib/validations/auth/auth.validation';
import { handleError } from '@/lib/errorHandler';
import { getUserByEmail } from '@/services/user.service';
import { generateToken } from '@/lib/utils/auth/jwt.utils';
import { JWT_TYPE_ENUM } from '@/lib/constants/enums/common.enum';
import { cookies } from 'next/headers';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and generates access and refresh tokens. Optionally, sets a "remember me" session.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: StrongPassword123
 *               rememberMe:
 *                 type: boolean
 *                 description: If true, generates a refresh token for persistent login.
 *                 example: true
 *     responses:
 *       200:
 *         description: Login successful.
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
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: Unique user ID.
 *                           example: 64f8d88e83b0a6f5e76a2d3b
 *                         email:
 *                           type: string
 *                           format: email
 *                           description: The user's email.
 *                           example: user@example.com
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp of user creation.
 *                           example: 2024-01-15T12:34:56.789Z
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp of the last user update.
 *                           example: 2024-03-12T08:15:30.123Z
 *                     accessToken:
 *                       type: string
 *                       description: The JWT access token.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     refreshToken:
 *                       type: string
 *                       description: The JWT refresh token (if `rememberMe` is true).
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials.
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
 *                   example: Invalid credentials
 *       404:
 *         description: User not found.
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
 *                   example: User not found
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
