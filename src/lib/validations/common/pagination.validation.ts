import { z } from 'zod';

// Zod schema for pagination parameters
export const paginationSchema = z.object({
  page: z
    .number()
    .int()
    .min(1, { message: "Page must be greater than or equal to 1." }),
  limit: z
    .number()
    .int()
    .min(1, { message: "Limit must be greater than or equal to 1." })
    .max(100, { message: "Limit cannot be greater than 100." }) // Set a reasonable max limit
});
