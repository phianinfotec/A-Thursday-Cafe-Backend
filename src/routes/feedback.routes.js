
const auth = require('../middlewares/auth.middleware');
const ctrl = require('../controllers/feedback.controller');
const express = require('express');
const router = express.Router();

router.post('/feedback', auth, ctrl.createFeedback);
router.get('/feedback', ctrl.getAllFeedbacks);

module.exports = router;
