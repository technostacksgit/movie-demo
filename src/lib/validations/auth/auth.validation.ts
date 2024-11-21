import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email").min(1, "Email is required"),
  password: z.string()
  .min(1, "Password must not be empty.") // Check for non-empty password
  .min(8, "Password must be at least 8 characters long.") // Minimum length
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter.",
  }) // At least one uppercase letter
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter.",
  }) // At least one lowercase letter
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number.",
  }) // At least one digit
  .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
    message: "Password must contain at least one special character.",
  }) // At least one special character
  .refine((password) => !/\s/.test(password), {
    message: "Password must not contain spaces.",
  }),
  // password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

export const registerSchema = z.object({
  email: z.string().email("Please provide a valid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;