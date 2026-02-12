const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact_us.controller');

router.post('/contact_us', contactController.submitContact);
router.get('/Contact_us', contactController.getAllContacts);

module.exports = router;
