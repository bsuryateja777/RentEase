// routes/cloudinaryRoutes.js
import { Router } from 'express';
import { uploadToCloudinary, deleteFromCloudinary } from '../controllers/cloudinaryController.js';

const router = Router();

router.post('/upload-to-cloudinary', uploadToCloudinary);
router.post('/delete-from-cloudinary', deleteFromCloudinary);

export default router;
