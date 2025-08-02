import AccomodatedPlaces from '../models/AccomodatedPlaces.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import imageDownloader from 'image-downloader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPlace = async (req, res) => {
  const place = await AccomodatedPlaces.create({
    ...req.body,
    owner: req.user.id,
  });
  res.json(place);
};

export const updatePlace = async (req, res) => {
  const { id, ...updates } = req.body;
  const place = await AccomodatedPlaces.findById(id);

  if (place.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  Object.assign(place, updates);
  await place.save();
  res.json(place);
};

export const getUserPlaces = async (req, res) => {
  const places = await AccomodatedPlaces.find({ owner: req.user.id });
  res.json(places);
};

export const getPlace = async (req, res) => {
  const place = await AccomodatedPlaces.findById(req.params.id);
  res.json(place);
};

export const deletePlace = async (req, res) => {
  await AccomodatedPlaces.findByIdAndDelete(req.params.id);
  res.json({ message: 'Place deleted' });
};

export const getAllPlaces = async (req, res) => {
  const { city, search } = req.query;
  const query = {};

  if (city && city !== 'All Cities') {
    query.address = { $regex: city, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { address: { $regex: search, $options: 'i' } },
      { title: { $regex: search, $options: 'i' } },
    ];
  }

  const places = await AccomodatedPlaces.find(query).populate('owner');
  res.json(places);
};


export const uploadByLink = async (req, res) => {
  const { link } = req.body;

  try {
    const filename = `photo_${Date.now()}.jpg`;
    const userPlacesDir = path.join(__dirname, '..', 'uploads', 'user-places');
    const uploadPath = path.join(userPlacesDir, filename);

    // Make sure the folder exists
    fs.mkdirSync(userPlacesDir, { recursive: true });

    await imageDownloader.image({
      url: link,
      dest: uploadPath,
    });

    res.json(filename);
  } catch (err) {
    console.error('Upload by link failed:', err.message);
    res.status(500).json({ error: 'Failed to download image' });
  }
};


export const uploadPhotos = async (req, res) => {
  const uploadedFiles = [];

  try {
    for (let file of req.files) {
      const ext = path.extname(file.originalname);
      const newPath = file.path + ext;
      fs.renameSync(file.path, newPath);
      uploadedFiles.push(path.basename(newPath));
    }

    res.json(uploadedFiles);
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};
