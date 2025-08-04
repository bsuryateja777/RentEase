// controllers/cloudinaryController.js
import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid image URL' });
    }

    

    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'RentEase-Unsigned',
      folder: 'RentEase-Unsigned',
      resource_type: 'image',
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
    console.log('url: ', result.secure_url)
    console.log('public_id: ', result.public_id)
  } catch (error) {
    console.error('Cloudinary direct URL upload failed:', error);
    res.status(500).json({ error: 'Failed to upload image from URL' });
  }
};
