import { Router } from 'express';
import { getUserDetails, updateUserDetails, changePassword } from '../controllers/userController.js';

const router = Router();

router.get('/account-center/personal-details/:id', getUserDetails);
router.put('/account-center/personal-details/:id', updateUserDetails);
router.put('/account-center/change-password/:id', changePassword);

export default router;
