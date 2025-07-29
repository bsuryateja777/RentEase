import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

export function verifyToken(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = userData;
    next();
  });
}


