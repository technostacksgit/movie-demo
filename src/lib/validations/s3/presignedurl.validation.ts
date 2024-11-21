import { z } from "zod";

export const presignedUrlSchema = z.object({
  objectKey: z.string({
    required_error: "Object key is required.",
  }),
  operation: z.enum(["GET", "PUT"], {
    errorMap: () => ({ message: "Operation must be either 'GET' or 'PUT'." }),
  }),
  expiresIn: z
    .number({
        required_error: "ExpiresIn key is required."
    })
    .int()
    .positive()
    .optional()
    .default(3600), // Default to 1 hour if not provided
});

// Example of how to use the schema
export type PresignedUrlRequestBody = z.infer<typeof presignedUrlSchema>;
