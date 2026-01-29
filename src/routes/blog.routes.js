const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/blogUpload');
const ctrl = require('../controllers/blog.controller');

router.post('/blogs', auth, upload.single('image'), ctrl.addBlog);
router.get('/blogs', ctrl.getBlogs);

module.exports = router;
