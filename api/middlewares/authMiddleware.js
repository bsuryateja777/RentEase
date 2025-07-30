import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

export function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }

  next();
}
