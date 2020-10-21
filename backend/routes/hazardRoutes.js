import express from 'express';
import { getHazards, createHazard } from '../controllers/hazardController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getHazards).post(protect, createHazard);

export default router;