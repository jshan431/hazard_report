import express from 'express';

import { getHazards, createHazard, getHazardById, updateHazard, deleteHazard } from '../controllers/hazardController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getHazards).post(protect, createHazard);

router.route('/:id')
  .get(getHazardById)
  .put(protect, updateHazard)
  .delete(protect, deleteHazard)
export default router;

