import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, defaultBucketName } from './s3Client';

const EXPIRES_IN = 1 * 60 * 60;

export const generatePresignedUrl = async ({
  key,
  expiresIn = EXPIRES_IN,
}: {
  key: string;
  expiresIn?: number;
}): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: defaultBucketName,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });

    return url;
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);

    throw new Error('Failed to generate pre-signed URL');
  }
};
