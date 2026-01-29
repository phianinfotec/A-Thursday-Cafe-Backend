const express = require('express');
const router = express.Router();
const auth = require('../routes/auth.routes');
const controller = require('../controllers/profile.controller');

router.get('/profile', auth, controller.getProfile);
router.get('/orders', auth, controller.getOrders);

module.exports = router;
