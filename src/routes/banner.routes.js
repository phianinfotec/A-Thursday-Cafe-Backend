const express = require('express');
const router = express.Router();

const bannerCtrl = require('../controllers/banner.controller');
const upload = require('../middlewares/upload.middleware');
const auth = require('../middlewares/auth.middleware');

/* =========================
   PUBLIC ROUTES (NO AUTH)
   ========================= */

// GET all banners (ADMIN TABLE)
router.get('/banner', bannerCtrl.getAllBanners);

// GET active banner (HEADER)
router.get('/active', bannerCtrl.getActiveBanner);

/* =========================
   PROTECTED ROUTES (AUTH)
   ========================= */

// ADD banner
router.post(
  '/banner',
  auth,                  // 🔐 AUTH HERE
  upload.single('image'),
  bannerCtrl.addBanner
);

// UPDATE status
router.patch(
  '/banner/:id/status',
  auth,                  // 🔐 AUTH HERE
  bannerCtrl.updateStatus
);

// DELETE banner
router.delete(
  '/banner/:id',
  auth,                  // 🔐 AUTH HERE
  bannerCtrl.deleteBanner
);

module.exports = router;
