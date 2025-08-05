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
  } catch (error) {
    console.log('Cloudinary direct URL upload failed:', error.message);
    res.status(500).json({ error: 'Failed to upload image from URL' });
  }
};


export const deleteFromCloudinary = async (req, res) => {
  const { public_id } = req.body;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("Delete from Cloudinary failed:", err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

