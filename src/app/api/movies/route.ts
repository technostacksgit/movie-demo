import { authGuard } from "@/lib/guards/auth.guard";
import { getAllMovies } from "@/services/movie.service";
import { NextResponse } from "next/server";

export async function GET() {
     // Update users
     const user = await authGuard();

     const allMovies = await getAllMovies(user._id);

     return NextResponse.json(allMovies, {status: 200});
}