import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser);

export default router;