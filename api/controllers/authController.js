import Users from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret =process.env.JWT_SECRET || 'default_secret';

export const testing = (req, res) => {
  res.json("working")
  res.send("working")
}

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
    { expiresIn: '24h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true, // Set true only with HTTPS
  }).json(user);
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.status(200).json({ message: 'Logged out successfully', tokenCleared: true });
};


export const profile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    const user = await Users.findById(userData.id);
    res.json(user);
  });
};

