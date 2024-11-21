import { handleError } from "@/lib/errorHandler";
import { authGuard } from "@/lib/guards/auth.guard";
import { updateMovieSchema } from "@/lib/validations/movie/movie.validation";
import { getMovieFromId, softDeleteMovie, updateMovieFromId } from "@/services/movie.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update an existing movie
 *     description: Updates the details of an existing movie. Requires user authentication and ownership of the movie.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: [] # Assuming token-based authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               posterImage:
 *                 type: string
 *                 description: URL or path to the new poster image of the movie.
 *               releaseYear:
 *                 type: integer
 *                 description: The updated release year of the movie.
 *               title:
 *                 type: string
 *                 description: The updated title of the movie.
 *     responses:
 *       200:
 *         description: Movie successfully updated.
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
 *                   example: Movie updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier of the movie in the database.
 *                     posterImage:
 *                       type: string
 *                       description: Updated URL or path to the poster image.
 *                     title:
 *                       type: string
 *                       description: Updated title of the movie.
 *                     releaseYear:
 *                       type: integer
 *                       description: Updated release year of the movie.
 *                     userId:
 *                       type: string
 *                       description: The ID of the user who owns the movie.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was last updated.
 *       403:
 *         description: Forbidden - The movie was not found or does not belong to the authenticated user.
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
 *                   example: Movie not found.
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
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the user
    const user = await authGuard();

    // Get the movie ID from URL params
    const movieId = (await params).id;

    // Get updated values from body
    const body = await request.json();

    // Validate body
    const fieldsToUpdate = updateMovieSchema.parse(body);

    // Check if the movie exists and belongs to the user
    const movie = await getMovieFromId(movieId, user._id);

    if (!movie) {
      return NextResponse.json(
        { success: false, message: "Movie not found." },
        { status: 403 }
      );
    }

    if(movie.posterImage !== fieldsToUpdate.posterImage) {
        // TODO: Delete the old image
        console.log("Deleting old image", movie.posterImage);
    }

    // Step 4: Update the movie based on the request body
    const updatedMovie = await updateMovieFromId(movieId, fieldsToUpdate);

    // Step 5: Respond with the updated movie
    return NextResponse.json(
      {
        success: true,
        message: "Movie updated successfully.",
        data: updatedMovie,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get details of a specific movie
 *     description: Fetches details of a specific movie by its ID. Requires user authentication and ownership of the movie.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: [] # Assuming token-based authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to retrieve.
 *     responses:
 *       200:
 *         description: Movie details successfully retrieved.
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
 *                   example: Movie retrieved successfully.
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
 *                       description: Title of the movie.
 *                     releaseYear:
 *                       type: integer
 *                       description: Release year of the movie.
 *                     userId:
 *                       type: string
 *                       description: The ID of the user who owns the movie.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was last updated.
 *       403:
 *         description: Forbidden - The movie was not found or does not belong to the authenticated user.
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
 *                   example: Movie not found.
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
 *                   description: Error message.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the user
    const user = await authGuard();

    // Get the movie ID from URL params
    const movieId = (await params).id;

    // Check if the movie exists and belongs to the user
    const movie = await getMovieFromId(movieId, user._id);

    if (!movie) {
      return NextResponse.json(
        { success: false, message: "Movie not found." },
        { status: 403 }
      );
    }

    // Step 5: Respond with the updated movie
    return NextResponse.json(
      {
        success: true,
        message: "Movie updated successfully.",
        data: movie,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Soft delete a movie
 *     description: Marks a movie as deleted without permanently removing it from the database. Requires user authentication.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: [] # Assuming token-based authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to delete.
 *     responses:
 *       200:
 *         description: Movie successfully soft-deleted.
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
 *                   example: Movie updated successfully.
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
 *                       description: Title of the movie.
 *                     releaseYear:
 *                       type: integer
 *                       description: Release year of the movie.
 *                     userId:
 *                       type: string
 *                       description: The ID of the user who owns the movie.
 *                     isDeleted:
 *                       type: boolean
 *                       description: Indicates whether the movie is marked as deleted.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the movie was last updated.
 *       403:
 *         description: Forbidden - The movie does not belong to the authenticated user or does not exist.
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
 *                   example: Movie not found.
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
 *                   description: Error message.
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the user
    const user = await authGuard();

    // Get the movie ID from URL params
    const movieId = (await params).id;

    // Delete the movie
    const movie = await softDeleteMovie(movieId)

    // Respond with the updated movie
    return NextResponse.json(
      {
        success: true,
        message: "Movie updated successfully.",
        data: movie,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}