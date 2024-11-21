import { handleError } from "@/lib/errorHandler";
import { authGuard } from "@/lib/guards/auth.guard";
import { addMovieSchema } from "@/lib/validations/movie/movie.validation";
import { createNewMovie } from "@/services/movie.service";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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


