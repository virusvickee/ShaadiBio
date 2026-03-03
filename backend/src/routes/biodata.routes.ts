import { Router } from 'express';
import * as biodataController from '../controllers/biodata.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createBiodataSchema, updateBiodataSchema } from '../utils/validation';

const router = Router();

router.use(authenticate);

router.post('/', validate(createBiodataSchema), biodataController.createBiodata);
router.get('/', biodataController.getBiodatas);
router.get('/:id', biodataController.getBiodata);
router.put('/:id', validate(updateBiodataSchema), biodataController.updateBiodata);
router.delete('/:id', biodataController.deleteBiodata);
router.post('/:id/duplicate', biodataController.duplicateBiodata);

export default router;
