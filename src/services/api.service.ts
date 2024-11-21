import { cookies } from "next/headers";

export const getAllMoviesApi = async (
  currentPage: number,
  pageSize: number
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const cookieHeader = (await cookies()).toString();

    const response = await fetch(
      `${baseUrl}/api/movies/list?page=${currentPage}&limit=${pageSize}`,
      {
        cache: "no-store",
        credentials: "include", // This forwards cookies
        headers: {
          Cookie: cookieHeader, // Forward the cookie header
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
