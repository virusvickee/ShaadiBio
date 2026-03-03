import Biodata from '../models/Biodata';
import Photo from '../models/Photo';
import { AppError } from '../middleware/error.middleware';
import { uploadToS3, deleteFromS3 } from '../config/s3';

export const uploadPhoto = async (
  biodataId: string,
  userId: string,
  file: Express.Multer.File,
  cropData?: any
) => {
  // Verify biodata belongs to user
  const biodata = await Biodata.findOne({ _id: biodataId, userId });

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  // Upload to S3 or save locally
  let url: string;
  
  if (process.env.AWS_S3_BUCKET) {
    url = await uploadToS3(file, 'photos');
  } else {
    // Local storage fallback
    url = `/uploads/${Date.now()}-${file.originalname}`;
    // TODO: Save file locally
  }

  // Save photo record
  const photo = await Photo.create({
    biodataId,
    url,
    cropData: cropData || null,
    fileSize: file.size
  });

  return photo;
};

export const deletePhoto = async (photoId: string, userId: string) => {
  const photo = await Photo.findById(photoId).populate('biodataId');

  if (!photo) {
    throw new AppError('Photo not found', 404);
  }

  const biodata = await Biodata.findById(photo.biodataId);
  
  if (!biodata || biodata.userId.toString() !== userId) {
    throw new AppError('Unauthorized', 403);
  }

  // Delete from S3 if configured
  if (process.env.AWS_S3_BUCKET && photo.url.includes('amazonaws.com')) {
    try {
      await deleteFromS3(photo.url);
    } catch (error) {
      console.error('Failed to delete from S3:', error);
    }
  }

  // Delete record
  await photo.deleteOne();

  return { message: 'Photo deleted successfully' };
};

export const getPhotos = async (biodataId: string, userId: string) => {
  const biodata = await Biodata.findOne({ _id: biodataId, userId });

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  return await Photo.find({ biodataId }).sort({ uploadedAt: -1 });
};
