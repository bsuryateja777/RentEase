import { Router } from 'express';
import { healthcheck, register, login, logout, profile} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/health', healthcheck);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', verifyToken, profile);

export default router;
