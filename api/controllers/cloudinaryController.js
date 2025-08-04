// controllers/cloudinaryController.js
import cloudinary from '../config/cloudinary.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { v4 as uuid } from 'uuid';

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /upload-to-cloudinary
export const uploadToCloudinaryByLink = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid image URL' });
    }
    const uniqueName = `temp_${uuid()}.jpg`;
    const tempPath = path.join(tmpdir(), uniqueName);


    // Step 1: Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: 'RentEase',
      upload_preset: 'RentEase-Preset', // must be unsigned
      public_id: 'tempPath',
    });

    // Step 2: Cleanup and return result
    fs.unlinkSync(tempPath); // remove temp file
    res.json({ url: result.secure_url, plublic_id : result.public_id });
    res.send({ url: result.secure_url, plublic_id : result.public_id });
  } catch (error) {
    console.error('Cloudinary upload failed:', error.message);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
