const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/blogUpload');
const ctrl = require('../controllers/blog.controller');
const adminAuth = require('../middlewares/adminAuth.middleware');

router.post('/blogs', auth, upload.single('image'), ctrl.addBlog);
router.get('/blogs', ctrl.getBlogs);

// ADMIN - Get All Blogs
router.get('/admin/blogs', adminAuth, async (req, res, next) => {
  next();
}, ctrl.getAllBlogsAdmin);




// ADMIN - Approve Blog
router.put('/admin/blogs/:id/approve', adminAuth, async (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin only' });
//   }
  next();
}, ctrl.approveBlog);


// ADMIN - Remove Blog
router.delete('/admin/blogs/:id/remove', adminAuth, async (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin only' });
//   }
  next();
}, ctrl.removeBlog);

module.exports = router;
