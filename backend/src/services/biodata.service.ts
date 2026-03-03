import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { TemplateType } from '@prisma/client';

export const createBiodata = async (
  userId: string,
  data: {
    title: string;
    templateType: TemplateType;
    formData: any;
    customization?: any;
  }
) => {
  const biodata = await prisma.biodata.create({
    data: {
      userId,
      title: data.title,
      templateType: data.templateType,
      formData: data.formData,
      customization: data.customization || {}
    }
  });

  return biodata;
};

export const getBiodatas = async (userId: string) => {
  const biodatas = await prisma.biodata.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    include: {
      photos: true,
      pdfs: {
        orderBy: { generatedAt: 'desc' },
        take: 1
      }
    }
  });

  return biodatas;
};

export const getBiodata = async (id: string, userId: string) => {
  const biodata = await prisma.biodata.findFirst({
    where: { id, userId },
    include: {
      photos: true,
      pdfs: {
        orderBy: { generatedAt: 'desc' }
      }
    }
  });

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  return biodata;
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
  const biodata = await prisma.biodata.findFirst({
    where: { id, userId }
  });

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  const updated = await prisma.biodata.update({
    where: { id },
    data
  });

  return updated;
};

export const deleteBiodata = async (id: string, userId: string) => {
  const biodata = await prisma.biodata.findFirst({
    where: { id, userId }
  });

  if (!biodata) {
    throw new AppError('Biodata not found', 404);
  }

  await prisma.biodata.delete({
    where: { id }
  });

  return { message: 'Biodata deleted successfully' };
};

export const duplicateBiodata = async (id: string, userId: string) => {
  const original = await prisma.biodata.findFirst({
    where: { id, userId }
  });

  if (!original) {
    throw new AppError('Biodata not found', 404);
  }

  const duplicate = await prisma.biodata.create({
    data: {
      userId,
      title: `${original.title} (Copy)`,
      templateType: original.templateType,
      formData: original.formData,
      customization: original.customization,
      isPublished: false
    }
  });

  return duplicate;
};
