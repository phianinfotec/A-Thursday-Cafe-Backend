const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/profile.controller');

/* USER */
router.get('/profile', auth, controller.getProfile);

/* ADMIN */
router.get('/admin/users', auth,controller.getAllUsers);
router.get('/admin/users/:id', auth, controller.getUserById);

module.exports = router;
