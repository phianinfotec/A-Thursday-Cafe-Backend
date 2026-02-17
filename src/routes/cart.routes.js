
const express = require("express");
const router = require('express').Router();
const controller = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require("../middlewares/upload.middleware");

// router.post('/', controller.addItem); // no login required
// router.post('/checkout', auth, controller.checkout);

// router.get('/:userId', controller.getCartItems);
// router.put('/:id', controller.updateQuantity);

router.post('/', auth, controller.addToCart);
router.get('/', auth, controller.getCartItems);
router.put('/:id', auth, controller.updateQuantity);
router.delete('/clear/all', auth, controller.clearCart);
router.delete('/:id', auth, controller.deleteItem);


module.exports = router;
