import express, { Router } from 'express';
import { forgotPassword, login, register, resetUserPassword, verifyUser, verifyUserForgotPassword } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', register);
router.post('/verify', verifyUser);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-user-forgot-password', verifyUserForgotPassword);
router.post('/reset-password', resetUserPassword);

export default router;
