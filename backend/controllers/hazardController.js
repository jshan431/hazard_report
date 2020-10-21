import asyncHandler from 'express-async-handler';
import Hazard from '../models/hazardModel.js';

const getHazards = asyncHandler(async (req, res) => {
  const hazards = await Hazard.find({});
  res.json({ hazards });
});

const createHazard = asyncHandler(async (req, res) => {
  const hazard = new Hazard({
    name: 'Sample Hazard',
    user: req.user._id,
    image: '/images/caution-tape.jpg',
    category: 'Sameple category',
    description: 'Sample description'
  });

  const createdHazard = await hazard.save();
  res.status(201).json(createdHazard);
});

export {
  getHazards,
  createHazard
}