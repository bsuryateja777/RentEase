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

    // Step 1: Download image temporarily
    const uniqueName = `temp_${uuid()}.jpg`;
    const tempPath = path.join(tmpdir(), uniqueName);
    const writer = fs.createWriteStream(tempPath);

    const response = await axios({
      url: image,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Step 2: Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: 'RentEase',
      upload_preset: 'RentEase-Preset', // must be unsigned
    });

    // Step 3: Cleanup and return result
    fs.unlinkSync(tempPath); // remove temp file
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload failed:', error.message);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
