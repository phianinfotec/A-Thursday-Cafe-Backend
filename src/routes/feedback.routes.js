
const auth = require('../middlewares/auth.middleware');
const ctrl = require('../controllers/feedback.controller');
const express = require('express');
const adminAuth = require('../middlewares/adminAuth.middleware');
const router = express.Router();

router.post('/feedback', auth, ctrl.createFeedback);
router.get('/feedback', ctrl.getAllFeedbacks);


/* ADMIN */
router.get('/admin/feedback', adminAuth, async (req, res, next) => {
  next();
}, ctrl.getAllFeedbacksAdmin);

router.put('/admin/feedback/:id/approve', adminAuth, async (req, res, next) => {
  next();
}, ctrl.approveFeedback);

router.delete('/admin/feedback/:id/remove', adminAuth, async (req, res, next) => {
  next();
}, ctrl.removeFeedback);

module.exports = router;
