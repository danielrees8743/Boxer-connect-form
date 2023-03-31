import { Router } from 'express';
import boxerController from '../controllers/boxerController.js';

import multer from 'multer';

// save the image into the uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const router = Router();
const upload = multer({ storage: storage }).single('picture');

router
  .route('/')
  .get(boxerController.getAllBoxers)
  .post(upload, boxerController.addBoxer);

export default router;
