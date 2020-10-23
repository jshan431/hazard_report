import axios from 'axios';
import asyncHandler from 'express-async-handler';

const getCoordsForAddress = asyncHandler(async (address) => {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  );

  const data = response.data;

  // if address cant be found
  if (!data || data.status === 'ZERO_RESULTS') {

    res.status(422);
    throw new Error('Could not find location for the specified address.');
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
});

export default getCoordsForAddress;