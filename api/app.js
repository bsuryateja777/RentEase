import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env variables
dotenv.config();

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cloudinaryRoutes from './routes/cloudinaryRoutes.js';


const app = express();

// Middlewares
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cors({
  origin: [
    "http://localhost:4000",
    "https://rentease-frontend.onrender.com",
    "https://amplifytf.d3un37pe37fa2e.amplifyapp.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(placeRoutes);
app.use(bookingRoutes);
app.use(cloudinaryRoutes);


export default app;
