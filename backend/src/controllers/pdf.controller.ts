import { Response, NextFunction } from 'express';
import * as pdfService from '../services/pdf.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const generatePdf = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { biodataId, htmlContent, hasWatermark } = req.body;

    if (!biodataId || !htmlContent) {
      return res.status(400).json({ message: 'biodataId and htmlContent are required' });
    }

    const pdf = await pdfService.generatePdf(biodataId, htmlContent, hasWatermark !== false);

    res.status(201).json({
      success: true,
      data: pdf
    });
  } catch (error) {
    next(error);
  }
};

export const downloadPdf = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { pdfId, biodataId } = req.params;
    const filepath = await pdfService.downloadPdf(pdfId, biodataId);

    res.download(filepath);
  } catch (error) {
    next(error);
  }
};

export const getPdfs = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { biodataId } = req.params;
    const pdfs = await pdfService.getPdfs(biodataId);

    res.json({
      success: true,
      data: pdfs
    });
  } catch (error) {
    next(error);
  }
};
