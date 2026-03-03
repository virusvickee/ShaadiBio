import { Response, NextFunction } from 'express';
import * as uploadService from '../services/upload.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const uploadPhoto = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { biodataId, cropData } = req.body;

    if (!biodataId) {
      return res.status(400).json({ message: 'biodataId is required' });
    }

    const photo = await uploadService.uploadPhoto(
      biodataId,
      req.userId,
      req.file,
      cropData ? JSON.parse(cropData) : undefined
    );

    res.status(201).json({
      success: true,
      data: photo
    });
  } catch (error) {
    next(error);
  }
};

export const deletePhoto = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const result = await uploadService.deletePhoto(req.params.id, req.userId);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getPhotos = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { biodataId } = req.params;
    const photos = await uploadService.getPhotos(biodataId, req.userId);

    res.json({
      success: true,
      data: photos
    });
  } catch (error) {
    next(error);
  }
};
