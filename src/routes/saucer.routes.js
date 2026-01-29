const express = require('express');
const router = express.Router();
const controller = require('../controllers/saucer.controller');

router.get('/saucers', controller.getSaucerItems);
router.post('/saucers', controller.createSaucerItem);
router.put('/saucers/:id', controller.updateSaucerItem);
router.delete('/saucers/:id', controller.deleteSaucerItem);

module.exports = router;
