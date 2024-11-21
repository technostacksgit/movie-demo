import { handleError } from "@/lib/errorHandler";
import { authGuard } from "@/lib/guards/auth.guard";
import { addMovieSchema } from "@/lib/validations/movie/movie.validation";
import { createNewMovie } from "@/services/movie.service";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a new movie
 *     description: Add a new movie to the database. Requires user authentication.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: [] # Assuming token-based authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - posterImage
 *               - releaseYear
 *               - title
 *             properties:
 *               posterImage:
 *                 type: string
 *                 description: URL or path to the poster image of the movie.
 *               releaseYear:
 *                 type: integer
 *                 description: The year the movie was released.
 *               title:
 *                 type: string
 *                 description: The title of the movie.
 *     responses:
 *       200:
 *         description: Successfully added the new movie.
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
 *                   example: New movie successfully added.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier of the movie in the database.
 *                     posterImage:
 *                       type: string
 *                       description: URL or path to the poster image.
 *                     title:
 *                       type: string
 *                       description: The title of the movie.
 *                     releaseYear:
 *                       type: integer
 *                       description: The release year of the movie.
 *                     userId:
 *                       type: string
 *                       description: The ID of the user who added the movie.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was last updated.
 *       400:
 *         description: Bad request - Invalid input parameters.
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
 *                   description: Error message describing the validation failure.
 *       401:
 *         description: Unauthorized - User is not authenticated.
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
 *                   description: Authentication error message.
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
 *                   description: Error message describing the internal issue.
 */

export async function POST(request: NextRequest){
    try {
        const body = await request.json();

        // Update users
        const user = await authGuard();

        const userId = user._id as Types.ObjectId;

        // Parse the movie input json
        const {posterImage, releaseYear, title} = addMovieSchema.parse(body);

        // Add this data in db
        const newMovie = await createNewMovie({posterImage: posterImage, title, releaseYear, userId})        

        return NextResponse.json(
            { success: true, message: 'New movie successfully added.', data: newMovie },
            { status: 200 }
          );
    } catch (error) {
        return handleError(error)
    }
}


