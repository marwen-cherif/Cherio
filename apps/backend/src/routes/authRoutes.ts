import express from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);

export default router;