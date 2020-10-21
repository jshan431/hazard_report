import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import hazardRoutes from './routes/hazardRoutes.js';

dotenv.config();

connectDB();

const app = express();

// used for logging incoming request info
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// allow us to accept json data in the body.
app.use(express.json());  

app.use('/api/users', userRoutes);
app.use('/api/hazards', hazardRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
})

// Page Not found Error Handling
app.use(notFound);

// Error Handling Middleware. takes in err first
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold));