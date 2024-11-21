import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to validate the email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string => {
  let error: string = '';

  // Check if the password is at least 8 characters
  if (password.length < 8) {
    error = "Password must be at least 8 characters long.";
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    error = "Password must contain at least one uppercase letter.";
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    error = "Password must contain at least one lowercase letter.";
  }

  // Check for at least one digit
  if (!/[0-9]/.test(password)) {
    error = "Password must contain at least one number.";
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    error = "Password must contain at least one special character.";
  }

  // Check for no spaces
  if (/\s/.test(password)) {
    error = "Password must not contain spaces.";
  }

  if(password.length === 0){
    error = "Password must not be empty."
  }

   return error;
};
