import asyncHandler from 'express-async-handler';
import Hazard from '../models/hazardModel.js';
import User from '../models/userModel.js';
import getCoordsForAddress from '../utils/location.js';
import mongoose from 'mongoose';

const getHazards = asyncHandler(async (req, res) => {
  const hazards = await Hazard.find({});
  res.json({ hazards });
});

const getHazardById = asyncHandler(async (req, res) => {
  const hazard = await Hazard.findById(req.params.id);

  if(hazard){
    res.json(hazard);       // send in json format
  } else {
    res.status(404);
    throw new Error('Hazard not found from given ID.');
  }
});

const createHazard = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);

  const hazard = new Hazard({
    name: 'Sample Hazard',
    user: req.user._id,
    image: '/images/caution-tape.jpg',
    category: 'Sameple category',
    description: 'Sample description'
  });

  const sess = await mongoose.startSession();
  sess.startTransaction();
  const createdHazard = await hazard.save({ session: sess });
  user.hazards.push(createdHazard);
  await user.save({session: sess});
  await sess.commitTransaction();

  res.status(201).json(createdHazard);
});

// @desc    Update a hazard
// @route   PUT /api/hazards/:id
// @access  Private/Auth
const updateHazard = asyncHandler(async (req, res) => {

  const {
    name,
    description,
    image,
    category,
    address,
  } = req.body

  const hazard = await Hazard.findById(req.params.id)

  if (hazard) {

    // Check to see if the user is allowed to update the hazard
    if(hazard.user.equals(req.user._id)){

      const coordinates = await getCoordsForAddress(address);

      hazard.name = name;
      hazard.description = description;
      hazard.image = image;
      hazard.category = category;
      hazard.address = address
      hazard.location = coordinates
      const updatedHazard = await hazard.save()
      res.json(updatedHazard)
    } else {
      res.status(404)
      throw new Error('Not Authorized to update this hazard')
    }

  } else {
    res.status(404)
    throw new Error('Hazard not found')
  }
});

// @desc    Delete a hazard
// @route   DELETE /api/hazards/:id
// @access  Private/Auth
const deleteHazard = asyncHandler(async (req, res) => {
  const hazard = await Hazard.findById(req.params.id).populate('user', 'name email hazards');

  if (hazard) {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await hazard.remove({session: sess});
    hazard.user.hazards.pull(hazard); // we are able to do this because of populate
    await hazard.user.save({session: sess});
    await sess.commitTransaction();
    res.json({ message: 'Hazard removed' });    
  } else {
    res.status(404)
    throw new Error('Hazard not found')
  }
});

export {
  getHazards,
  createHazard,
  getHazardById,
  updateHazard,
  deleteHazard
}