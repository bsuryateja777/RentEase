// routes/cloudinaryRoutes.js
import { Router } from 'express';
import { uploadToCloudinary } from '../controllers/cloudinaryController.js';

const router = Router();

router.post('/upload-to-cloudinary', uploadToCloudinary);

export default router;
