import { handleError } from "@/lib/errorHandler";
import { authGuard } from "@/lib/guards/auth.guard";
import { updateMovieSchema } from "@/lib/validations/movie/movie.validation";
import { getMovieFromId, softDeleteMovie, updateMovieFromId } from "@/services/movie.service";
import { NextRequest, NextResponse } from "next/server";

// PUT handler to update a movie based on movie ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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
        // Delete the old image
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
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