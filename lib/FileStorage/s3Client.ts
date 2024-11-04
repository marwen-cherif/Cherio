import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';

export const defaultBucketName = 'cherio';

export const s3Client = new S3Client({
  region: 'eu-west-2',
  credentials: fromEnv(),
  endpoint: 'https://s3.eu-west-2.wasabisys.com',
});
