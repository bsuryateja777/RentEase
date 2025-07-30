import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

export function verifyToken(req, res, next) {
  const token = req.cookies.token;
  
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // So req.user.id is accessible
    next();
  
}
