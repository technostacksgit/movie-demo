import React from "react";
import MovieForm from "@/app/(protected)/movie/components/movie-form";
import { cookies } from 'next/headers';

async function EditMoviePage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const cookieHeader = await cookies().toString();
  const response = await fetch(`${baseUrl}/api/movies/${params.id}`, { 
    cache: 'no-store',
    credentials: 'include',  // This forwards cookies
    headers: {
      'Cookie': cookieHeader  // Forward the cookie header
    }
  }).then((res) => res.json());


  const movie = response.data;

  

  return <MovieForm movie={movie} />;
}

export default EditMoviePage;
