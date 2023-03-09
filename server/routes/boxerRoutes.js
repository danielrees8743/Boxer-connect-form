import { Router } from 'express';
import boxerController from '../controllers/boxerController.js';

const router = Router();

router.post('/', boxerController.addBoxer);

export default router;
