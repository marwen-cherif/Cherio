import { Upload } from '@aws-sdk/lib-storage';
import { defaultBucketName, s3Client } from './s3Client';

export const uploadFileToStorage = async ({
  key,
  file,
}: {
  key: string;
  file: File;
}) => {
  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: { Bucket: defaultBucketName, Key: key, Body: file },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    });

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.info(progress);
    });

    await parallelUploads3.done();
  } catch (e) {
    console.error(e);

    throw new Error('Failed to upload file');
  }
};
