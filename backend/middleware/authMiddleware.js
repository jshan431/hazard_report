import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler (async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    // if the token exist in the headers and it starts with 'Bearer' try to decode it
    try {
      token = req.headers.authorization.split(' ')[1];      // split at the space and return second element which is the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);    // verify the token

      // set the user in the req.
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token');
  }


});

const admin = (req, res, next) => {
  // if req.user exist and is admin let the incoming req continue to the next middleware
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin!')
  }
}

export { protect, admin }