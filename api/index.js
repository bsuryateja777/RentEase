// index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen( port, () => console.log('Server running at http://localhost:4000'));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
