import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "@/lib/utils/aws/aws.utils";
import { presignedUrlSchema } from "@/lib/validations/s3/presignedurl.validation";
import { authGuard } from "@/lib/guards/auth.guard";
import { handleError } from "@/lib/errorHandler";



/**
 * @swagger
 * /api/s3/presigned-url:
 *   post:
 *     tags:
 *       - S3 Operations
 *     summary: Generate a pre-signed URL for S3 operations
 *     description: Returns a pre-signed URL for the given object key and operation (GET/PUT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - objectKey
 *               - operation
 *             properties:
 *               objectKey:
 *                 type: string
 *                 description: The key of the object in the S3 bucket
 *               operation:
 *                 type: string
 *                 enum: [GET, PUT]
 *                 description: The S3 operation type
 *               expiresIn:
 *                 type: integer
 *                 minimum: 1
 *                 default: 3600
 *                 description: URL expiration time in seconds (defaults to 1 hour)
 *     responses:
 *       200:
 *         description: Pre-signed URL successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The generated pre-signed URL
 *       400:
 *         description: Bad request - Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the validation failure
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

export async function POST(request: NextRequest) {
  try {
    // Check if the user is authenticated
    await authGuard()

    // Parse and validate the request body
    const body = await request.json();
    const validatedBody = presignedUrlSchema.parse(body);

    const { objectKey, operation, expiresIn } = validatedBody;

    // Generate the pre-signed URL using the utility function
    const url = await generatePresignedUrl(process.env.AWS_S3_BUCKET_NAME as string, objectKey, operation, expiresIn);

    // Return the generated URL
    return NextResponse.json(
      { success: true, message: 'Pre-signed url successfully generated.', data: url },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error)
  }
}
