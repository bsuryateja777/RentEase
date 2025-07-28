import Users from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

export const register = async (req, res) => {
  const { name, email, age, gender, password } = req.body;

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await Users.create({
    name,
    email,
    age,
    gender,
    password: hashedPassword,
  });

  res.status(201).json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    jwtSecret,
    { expiresIn: '1d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false, // Set true only with HTTPS
  }).json(user);
};

export const logout = (req, res) => {
  res.cookie('token', '').json(true);
};

export const profile = async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json(user);
};
