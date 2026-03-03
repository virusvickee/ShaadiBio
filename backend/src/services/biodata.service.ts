import Biodata from '../models/Biodata';
import Photo from '../models/Photo';
import Pdf from '../models/Pdf';
import { AppError } from '../middleware/error.middleware';

type TemplateType = 'TRADITIONAL' | 'MODERN' | 'MINIMALIST';

export const createBiodata = async (
  userId: string,
  data: {
    title: string;
    templateType: TemplateType;
    formData: any;
    customization?: any;
  }
) => {
  const biodata = await Biodata.create({
    userId,
    title: data.title,
    templateType: data.templateType,
    formData: data.formData,
    customization: data.customization || {}
  });

  return biodata;
};

export const getBiodatas = async (userId: string) => {
  const biodatas = await Biodata.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();

  // Get photos and PDFs for each biodata
  const biodatasWithDetails = await Promise.all(
    biodatas.map(async (biodata) => {
      const photos = await Photo.find({ biodataId: biodata._id }).lean();
      const pdfs = await Pdf.find({ biodataId: biodata._id })
        .sort({ generatedAt: -1 })
        .limit(1)
        .lean();

      return {
        ...biodata,
        photos,
        pdfs
      };
    })
  );

  return biodatasWithDetails;
};

export const getBiodata = async (id: string, userId: string) => {
  const biodata = await Biodata.findOne({ _id: id, userId }).lean();

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  const photos = await Photo.find({ biodataId: id }).lean();
  const pdfs = await Pdf.find({ biodataId: id }).sort({ generatedAt: -1 }).lean();

  return {
    ...biodata,
    photos,
    pdfs
  };
};

export const updateBiodata = async (
  id: string,
  userId: string,
  data: {
    title?: string;
    templateType?: TemplateType;
    formData?: any;
    customization?: any;
    isPublished?: boolean;
  }
) => {
  const biodata = await Biodata.findOne({ _id: id, userId });

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  Object.assign(biodata, data);
  await biodata.save();

  return biodata;
};

export const deleteBiodata = async (id: string, userId: string) => {
  const biodata = await Biodata.findOne({ _id: id, userId });

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  // Delete associated photos and PDFs
  await Photo.deleteMany({ biodataId: id });
  await Pdf.deleteMany({ biodataId: id });
  await biodata.deleteOne();

  return { message: 'Biodata deleted successfully' };
};

export const duplicateBiodata = async (id: string, userId: string) => {
  const original = await Biodata.findOne({ _id: id, userId }).lean();

  if (!original) {
    throw new AppError('Biodata not found', 404);
  }

  const duplicate = await Biodata.create({
    userId,
    title: `${original.title} (Copy)`,
    templateType: original.templateType,
    formData: original.formData,
    customization: original.customization,
    isPublished: false
  });

  return duplicate;
};
