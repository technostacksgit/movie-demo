// lib/errorHandler.ts
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import CustomError from './customError';

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    // Zod validation errors
    const formattedErrors = error.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }));

    return NextResponse.json({
      success: false,
      message: 'Validation Error',
      errors: formattedErrors,
    },
      { status: 400 }
    );
  } else if (error instanceof Error) {
    // General errors
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    },
      { status: 500 }
    );
  } else if(error instanceof CustomError){
    // Custom errors
    return NextResponse.json({
      success: false,
      message: error.statusCode >= 500 ? "Intenal server error." : error.message,
    },{
      status: error.statusCode
    })
  }
  else {
    // Unexpected error type
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
    },
      { status: 500 }
    );
  }
}
