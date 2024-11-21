import { z } from "zod";

export const addMovieSchema = z.object({
    posterImage: z
      .string({
        required_error: "The poster field is required. Please upload a movie poster."
      }),
    title: z
      .string({
        required_error: "The title field is required. Please provide a movie title."
      })
      .min(1, { message: "The title field is required. Please provide a movie title." }),
    releaseYear: z
      .number({
        invalid_type_error: "The release year must be a number.",
        required_error: "The release year is required. Please specify the year the movie was released.",
      })
      .int({ message: "The release year must be a whole number." })
      .min(1800, { message: "The release year must be after 1800." })
      .max(new Date().getFullYear(), { message: `The release year cannot be later than ${new Date().getFullYear()}.` }),
  });


  export const updateMovieSchema = z.object({
    posterImage: z
      .string({
        required_error: "The poster field is required. Please upload a movie poster."
      })
      .optional(),
    title: z
      .string({
        required_error: "The title field is required. Please provide a movie title."
      })
      .min(1, { message: "The title field is required. Please provide a movie title." })
      .optional(),
    releaseYear: z
      .number({
        invalid_type_error: "The release year must be a number.",
        required_error: "The release year is required. Please specify the year the movie was released.",
      })
      .int({ message: "The release year must be a whole number." })
      .min(1800, { message: "The release year must be after 1800." })
      .max(new Date().getFullYear(), { message: `The release year cannot be later than ${new Date().getFullYear()}.` })
      .optional(),
  });