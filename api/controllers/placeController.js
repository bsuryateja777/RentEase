import AccomodatedPlaces from '../models/AccomodatedPlaces.js';
import cloudinary from '../config/cloudinary.js';


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



export const uploadToCloudinary = async (req, res) => {
  try {
    const { image } = req.body;

    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'RentEase-Preset', // 🔁 required for unsigned uploads
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

