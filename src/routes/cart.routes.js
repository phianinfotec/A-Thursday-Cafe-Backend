
const express = require("express");
const router = require('express').Router();
const controller = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require("../middlewares/upload.middleware");

router.post('/', upload.single("image"),controller.addItem);

router.get('/:userId', controller.getCartItems);
router.put('/cart/:id',auth, controller.updateQuantity);

module.exports = router;
