import path from 'path';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import hazardRoutes from './routes/hazardRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

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
app.use('/api/upload', uploadRoutes);

// uploads folder must be made static folder so that it can be loaded in the browser
const __dirname = path.resolve();         // point to the current path
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// Page Not found Error Handling
app.use(notFound);

// Error Handling Middleware. takes in err first
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold));