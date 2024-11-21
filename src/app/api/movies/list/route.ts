import { handleError } from '@/lib/errorHandler';
import { authGuard } from '@/lib/guards/auth.guard';
import { paginationSchema } from '@/lib/validations/common/pagination.validation';
import { getAllMovies } from '@/services/movie.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
     try {
          // Step 1: Authenticate the user
          const user = await authGuard();

          // Step 2: Extract pagination parameters from the request query
          const url = new URL(request.url);
          const page = parseInt(url.searchParams.get('page') || '1');
          const limit = parseInt(url.searchParams.get('limit') || '8');

          // Step 3: Validate pagination parameters using Zod schema
          const pagination = paginationSchema.parse({ page, limit });

          // Step 4: Calculate the skip value for pagination
          const skip = (page - 1) * limit;

          // Step 4: Fetch paginated movies from the database
          const result = await getAllMovies(user._id, {
               page,
               limit,
               skip
          });

          // Step 5: Return the response with movies and pagination info
          return NextResponse.json(result);
     } catch (error) {
          return handleError(error)
     }
}
