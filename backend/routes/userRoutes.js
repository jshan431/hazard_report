import express from 'express';
import { registerUser, authUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);;

export default router;