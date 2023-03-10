import { Router } from 'express';
import boxerController from '../controllers/boxerController.js';

const router = Router();

router
  .route('/')
  .get(boxerController.getAllBoxers)
  .post(boxerController.addBoxer);

export default router;
