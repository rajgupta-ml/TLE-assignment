// src/config/database.ts (or src/utils/db.ts)
import mongoose from 'mongoose';
import { config } from './config';


const DB_URI = config.db.URI

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Exit process with failure code
    process.exit(1);
  }
};