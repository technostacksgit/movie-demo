type Movie = {
  _id: string;
  posterImage: string;
  title: string;
  releaseYear: number;
  userId: string;
  isDeleted: boolean;
  createdAt: string; // Use Date if you want to handle it as a Date object later
  updatedAt: string; // Use Date if you want to handle it as a Date object later
  __v: number;
};

type MoviesApiResponse = {
  movies: Movie[];
  pagination: Pagination;
};
