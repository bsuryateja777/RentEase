import { Router } from 'express';
import { register, login, logout, profile, testing } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();


router.get('/', testing)
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', verifyToken, profile);

export default router;
