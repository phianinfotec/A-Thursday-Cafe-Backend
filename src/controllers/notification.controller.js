const notificationService = require("../services/notification.service");

/* GET ALL */
const getNotifications = async (req, res) => {
  try {
    const data = await notificationService.getAllNotifications();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* GET UNREAD COUNT */
const getUnreadCount = async (req, res) => {
  try {
    const count = await notificationService.getUnreadCount();
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* MARK ALL AS READ */
const markAllAsRead = async (req, res) => {
  try {
    await notificationService.markAllAsRead();
    res.json({ success: true, message: "Marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
};
