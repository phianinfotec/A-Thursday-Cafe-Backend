const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/contact.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth,upload.single('image'), controller.createContact);
router.get('/', controller.getContacts);
router.get('/:id',auth, controller.getContactById);
router.put('/:id',auth, upload.single('image'), controller.updateContact);
router.delete('/:id',auth, controller.deleteContact);

module.exports = router;
