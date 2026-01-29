const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const upload = require('../middlewares/upload.middleware');

/* ADMIN */
router.post('/', upload.single('image'), controller.createProduct);
router.get('/admin', controller.getAdminProducts);
router.put('/:id', upload.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

/* USER */
router.get('/user', controller.getUserProducts);
router.get('/popular', controller.getPopularProducts); // ⭐ NEW

module.exports = router;
