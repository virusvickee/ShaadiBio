import { Router } from 'express';
import * as biodataController from '../controllers/biodata.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', biodataController.createBiodata);
router.get('/', biodataController.getBiodatas);
router.get('/:id', biodataController.getBiodata);
router.put('/:id', biodataController.updateBiodata);
router.delete('/:id', biodataController.deleteBiodata);
router.post('/:id/duplicate', biodataController.duplicateBiodata);

export default router;
