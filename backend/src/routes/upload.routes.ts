import { Router } from 'express';
import * as uploadController from '../controllers/upload.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../config/multer';
import { uploadLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

router.use(authenticate);
router.use(uploadLimiter);

router.post('/photo', upload.single('photo'), uploadController.uploadPhoto);
router.delete('/photo/:id', uploadController.deletePhoto);
router.get('/photos/:biodataId', uploadController.getPhotos);

export default router;
