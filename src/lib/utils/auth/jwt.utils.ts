import { JWT_TYPE_ENUM } from '@/lib/constants/enums/common.enum';
import jwt, { JwtPayload as JwtPayloadType } from 'jsonwebtoken';

type JwtPayload = JwtPayloadType & {
  userId: string;
}


// Secret keys from .env
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const ACCESS_TOKEN_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '1h'; // Example: 1h for 1 hour
const REFRESH_TOKEN_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d'; // Example: 7 days


/**
 * Generate a JWT token.
 * @param payload - The payload to include in the token.
 * @param type - The type of token to generate (ACCESS or REFRESH).
 * @returns The signed JWT token as a string.
 */
export const generateToken = (payload: JwtPayload, type: JWT_TYPE_ENUM): string => {
  try {
    const expiry = type === JWT_TYPE_ENUM.ACCESS ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION;
    const secret = type === JWT_TYPE_ENUM.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
  
    return jwt.sign(payload, secret, { expiresIn: expiry })
  } catch (_error) {
    throw new Error("Error generating JWT token.")
  }
  };

/**
 * Verify a JWT token.
 * @param token - The JWT token to verify.
 * @param type - The type of token to verify (ACCESS or REFRESH).
 * @returns The decoded JWT payload if the token is valid.
 */
export const verifyToken = (token: string, type: JWT_TYPE_ENUM): JwtPayload => {
    try {
      const secret = type === JWT_TYPE_ENUM.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
      return jwt.verify(token, secret) as JwtPayload;
    } catch (_error: unknown) {
      throw new Error('Invalid or expired token');
    }
  };

/**
 * Decodes a JWT token without verifying its signature.
 * @param token - The JWT token to decode.
 * @returns The decoded payload or null if decoding fails.
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload | null;
  } catch (_error: unknown) {
    console.error('JWT decoding failed:', _error);
    return null;
  }
};