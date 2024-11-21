import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export type PresignedUrlOperation = "GET" | "PUT";

/**
 * Generate a pre-signed URL for S3
 * @param bucketName - The name of the S3 bucket
 * @param objectKey - The key (name) of the object in the bucket
 * @param operation - 'GET' for download or 'PUT' for upload
 * @param expiresIn - Expiration time for the URL in seconds (default: 3600)
 * @returns The pre-signed URL
 * @throws Error if operation is invalid or URL generation fails
 */
export async function generatePresignedUrl(
  bucketName: string,
  objectKey: string,
  operation: PresignedUrlOperation,
  expiresIn: number = 3600
): Promise<string> {
  try {
    let command;

    // Determine the command based on the operation
    if (operation === "GET") {
      command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });
    } else if (operation === "PUT") {
      command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });
    } else {
      throw new Error("Invalid operation. Use 'GET' or 'PUT'.");
    }

    // Generate and return the pre-signed URL
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error;
  }
}
