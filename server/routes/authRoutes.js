import express from 'express';
import {
  signup, login, getUser,
  forgotPassword, resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', getUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
