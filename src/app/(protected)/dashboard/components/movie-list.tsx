"use client";
import React, { useState } from "react";
import Card from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MovieListPagination from "./movie-list-pagination";
import MovieListHeader from "./movie-list-header";
import { toast } from "@/hooks/useToast";// Import PermissionPopup
import PermissionPopup from "@/components/ui/permission-popup";

type MovieData = {
  movies: Movie[];
  pagination: {
    totalMovies: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

type MoiveListProps = {
  data: MovieData;
  currentPage: number;
  limit: number;
  totalPages: number;
};

function MoviesList({
  data,
  currentPage,
  limit,
  totalPages,
}: MoiveListProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null); // Store the movieId for the movie to delete

  const handleConfirmDelete = () => {
    if (movieToDelete) {
      handleDeleteCard(movieToDelete); // Call your delete handler
      setIsDialogOpen(false); // Close the dialog
      toast({
        title: "Poof! It's Gone!",
        description: "You’ve just wiped this movie from your collection. Abracadabra!",
        variant: "default",
      });
    }
  };

  const handleDeleteCard = async (movieId: string) => {
    try {
      // Send delete request to the API
      const deleteResponse = await fetch(
        `api/movies/${movieId}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the movie");
      }

      // Refetch the updated list of movies after deletion
      router.push(`/dashboard?page=${currentPage}&limit=${limit}`);
      router.refresh();
    } catch (error: unknown) {
      console.error("Error while deleting the movie:", (error as Error).message);
    }
  };

  const handlePageChange = (newPage: number) => {
    // Update the URL with the new page number
    router.push(`/dashboard?page=${newPage}&limit=${limit}`);
    router.refresh();
  };

  const openDeleteDialog = (movieId: string) => {
    setMovieToDelete(movieId); // Set the movieId to be deleted
    setIsDialogOpen(true); // Open the confirmation dialog
  };

  return (
    <div>
      <div className="container py-10 lg:py-20">
        <MovieListHeader />

        {/* List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[10px] sm:gap-[24px] place-items-center mt-5 lg:mt-10">
          {data.movies.length > 0 &&
            data.movies.map(({ _id, posterImage, title, releaseYear }) => (
              <Link href={`/movie/${_id}`} key={_id}>
                <Card
                  handleDeleteCard={handleDeleteCard} // Open delete dialog on click
                  key={_id}
                  id={_id}
                  posterUrl={posterImage}
                  title={title}
                  releaseYear={releaseYear}
                />
              </Link>
            ))}
        </div>

        {/* Pagination */}
        <MovieListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
        

        {/* Permission Popup */}
        <PermissionPopup
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
}

export default MoviesList;
