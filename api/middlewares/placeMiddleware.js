import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '..', 'uploads', 'user-places');

export const multerMiddleware = multer({
  dest: uploadDir,
});
