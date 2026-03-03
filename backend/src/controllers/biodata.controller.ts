import { Response, NextFunction } from 'express';
import * as biodataService from '../services/biodata.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const createBiodata = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const biodata = await biodataService.createBiodata(req.userId!, req.body);

    res.status(201).json({
      success: true,
      data: biodata
    });
  } catch (error) {
    next(error);
  }
};

export const getBiodatas = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const biodatas = await biodataService.getBiodatas(req.userId!);

    res.json({
      success: true,
      data: biodatas
    });
  } catch (error) {
    next(error);
  }
};

export const getBiodata = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const biodata = await biodataService.getBiodata(req.params.id, req.userId!);

    res.json({
      success: true,
      data: biodata
    });
  } catch (error) {
    next(error);
  }
};

export const updateBiodata = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const biodata = await biodataService.updateBiodata(req.params.id, req.userId!, req.body);

    res.json({
      success: true,
      data: biodata
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBiodata = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await biodataService.deleteBiodata(req.params.id, req.userId!);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const duplicateBiodata = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const biodata = await biodataService.duplicateBiodata(req.params.id, req.userId!);

    res.status(201).json({
      success: true,
      data: biodata
    });
  } catch (error) {
    next(error);
  }
};
