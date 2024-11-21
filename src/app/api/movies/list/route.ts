import { handleError } from "@/lib/errorHandler";
import { authGuard } from "@/lib/guards/auth.guard";
import { paginationSchema } from "@/lib/validations/common/pagination.validation";
import { getAllMovies } from "@/services/movie.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/movies/list:
 *   get:
 *     summary: Fetch paginated movies
 *     description: Retrieve a list of movies based on pagination parameters. Requires user authentication.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: [] # Assuming token-based authentication
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 8
 *         description: The number of movies per page (default is 8).
 *     responses:
 *       200:
 *         description: A paginated list of movies with additional pagination information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier for the movie.
 *                       posterImage:
 *                         type: string
 *                         description: The URL of the movie's poster image.
 *                       title:
 *                         type: string
 *                         description: The title of the movie.
 *                       releaseYear:
 *                         type: integer
 *                         description: The year the movie was released.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the movie was created in the database.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the movie was last updated.
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalMovies:
 *                       type: integer
 *                       description: The total number of movies available.
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages available.
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number.
 *                     limit:
 *                       type: integer
 *                       description: The number of movies per page.
 *       400:
 *         description: Bad request - Invalid pagination parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue.
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Authentication error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the internal issue.
 */

export async function GET(request: NextRequest) {
  try {
    // Authenticate the user
    const user = await authGuard();

    // Extract pagination parameters from the request query
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "8");

    // Validate pagination parameters using Zod schema
    paginationSchema.parse({ page, limit });

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch paginated movies from the database
    const result = await getAllMovies(user._id, {
      page,
      limit,
      skip,
    });

    // Return the response with movies and pagination info
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
