const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const adminAuth = require("../middlewares/adminAuth.middleware");

/* GET ALL NOTIFICATIONS */
router.get(
  "/notifications",
  adminAuth,
  notificationController.getNotifications
);

/* GET UNREAD COUNT */
router.get(
  "/notifications/unread-count",
  adminAuth,
  notificationController.getUnreadCount
);

/* MARK ALL AS READ */
router.put(
  "/notifications/mark-all-read",
  adminAuth,
  notificationController.markAllAsRead
);

module.exports = router;
