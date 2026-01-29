const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'src/assets/blogs',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-blog' + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    cb(new Error('Only JPG, PNG, WEBP allowed'));
  } else {
    cb(null, true);
  }
};

module.exports = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // ✅ 2MB max
  fileFilter
});
