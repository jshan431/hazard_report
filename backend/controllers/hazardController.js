import asyncHandler from 'express-async-handler';
import Hazard from '../models/hazardModel.js';

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

// @desc    Update a hazard
// @route   PUT /api/hazards/:id
// @access  Private/Admin
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
      hazard.name = name;
      hazard.description = description;
      hazard.image = image;
      hazard.category = category;
      hazard.address = address
  
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
})

export {
  getHazards,
  createHazard,
  getHazardById,
  updateHazard
}