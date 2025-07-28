import Users from '../models/Users.js';
import bcrypt from 'bcryptjs';

export const getUserDetails = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, email, age, gender } = user;
  res.json({ name, email, age, gender });
};

export const updateUserDetails = async (req, res) => {
  const { name, email, age, gender } = req.body;
  const updated = await Users.findByIdAndUpdate(
    req.params.id,
    { name, email, age, gender },
    { new: true }
  );
  res.json(updated);
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await Users.findById(req.params.id);
  
  if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
    return res.status(401).json({ message: 'Incorrect current password' });
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  await user.save();
  res.json({ message: 'Password changed successfully' });
};
