const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/about.controller');
const auth = require("../middlewares/auth.middleware");

router.post('/', auth,upload.single('image'), controller.createAbout);
router.get('/', controller.getAboutList);
router.get('/:id',auth, controller.getAboutById);
router.put('/:id',auth, upload.single('image'), controller.updateAbout);
router.delete('/:id',auth, controller.deleteAbout);

module.exports = router;
