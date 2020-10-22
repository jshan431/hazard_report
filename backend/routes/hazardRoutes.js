import express from 'express';

import { getHazards, createHazard, getHazardById, updateHazard } from '../controllers/hazardController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getHazards).post(protect, createHazard);

router.route('/:id')
  .get(getHazardById)
  .put(protect, updateHazard)
export default router;