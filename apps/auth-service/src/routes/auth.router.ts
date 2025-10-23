import express, { Router } from 'express';
import { login, register, verifyUser } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', register);
router.post('/verify', verifyUser);
router.post('/login', login);

export default router;
