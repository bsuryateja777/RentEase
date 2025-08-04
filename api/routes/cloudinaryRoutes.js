// routes/cloudinaryRoutes.js
import { Router } from 'express';
import { uploadToCloudinaryByLink } from '../controllers/cloudinaryController.js';

const router = Router();

router.post('/upload-to-cloudinary', uploadToCloudinaryByLink);

export default router;
