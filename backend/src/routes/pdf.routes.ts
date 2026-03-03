import { Router } from 'express';
import * as pdfController from '../controllers/pdf.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', pdfController.generatePdf);
router.get('/:biodataId', pdfController.getPdfs);
router.get('/:biodataId/:pdfId/download', pdfController.downloadPdf);

export default router;
