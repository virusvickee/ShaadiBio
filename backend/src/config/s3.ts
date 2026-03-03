import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = process.env.AWS_ACCESS_KEY_ID ? new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
}) : null;

export const uploadToS3 = async (
  file: Express.Multer.File,
  folder: string = 'photos'
): Promise<string> => {
  if (!s3Client || !process.env.AWS_S3_BUCKET) {
    throw new Error('S3 not configured');
  }

  const key = `${folder}/${Date.now()}-${file.originalname}`;

  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  }));

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export const deleteFromS3 = async (url: string): Promise<void> => {
  if (!s3Client || !process.env.AWS_S3_BUCKET) {
    throw new Error('S3 not configured');
  }

  const key = url.split('.amazonaws.com/')[1];
  
  await s3Client.send(new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key
  }));
};

export const getPresignedUrl = async (key: string): Promise<string> => {
  if (!s3Client || !process.env.AWS_S3_BUCKET) {
    throw new Error('S3 not configured');
  }

  return await getSignedUrl(s3Client, new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key
  }), { expiresIn: 3600 });
};
