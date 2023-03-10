import { Router } from 'express';
import clubsController from '../controllers/clubsController.js';

const router = Router();

router.get('/', clubsController.getAllClubs);

export default router;
