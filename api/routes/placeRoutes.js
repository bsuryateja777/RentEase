import { Router } from 'express';
import { createPlace, updatePlace, getUserPlaces, getPlace, deletePlace, getAllPlaces, uploadByLink, uploadPhotos } from '../controllers/placeController.js';
import { multerMiddleware } from '../middlewares/placeMiddleware.js';


import { verifyToken } from '../middlewares/authMiddleware.js';



const router = Router();

router.post('/my-accomodations', verifyToken, createPlace);
router.put('/my-accomodations', verifyToken, updatePlace);
router.get('/my-accomodations', verifyToken, getUserPlaces);
router.get('/my-accomodations/:id', getPlace);
router.delete('/my-accomodations/:id', deletePlace);

router.get('/places', getAllPlaces);
router.get('/all-places/:id', getPlace);  // Optional: You may remove if duplicate of above

router.post('/upload-by-link', uploadByLink);
router.post('/upload', multerMiddleware.array('photos', 10), uploadPhotos);

export default router;
