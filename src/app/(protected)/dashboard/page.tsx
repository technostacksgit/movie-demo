import React from "react";
import MoviesList from "./components/movie-list";
import Link from "next/link";
import { getAllMoviesApi } from "@/services/api.service";
import DashboardEmptyState from "./components/empty-state";

type SearchParams = {
  page?: string;
  limit?: string;
};

async function Dashboard({ searchParams }: { searchParams: SearchParams }) {
  // Get params
  const page = parseInt((await searchParams).page as string) || 1;
  const limit = parseInt((await searchParams).limit as string) || 1;

  // Get movie data
  const moviesData = await getAllMoviesApi(page, limit);
  const totalPages = moviesData?.pagination?.totalPages || 1;

  return (
    <>
      {moviesData && moviesData?.movies.length > 0 ? (
        <MoviesList
          data={moviesData}
          currentPage={page}
          limit={limit}
          totalPages={totalPages}
        />
      ) : (
        <DashboardEmptyState />
      )}
    </>
  );
}

export default Dashboard;
