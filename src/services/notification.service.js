const db = require("../config/db");

/* CREATE NOTIFICATION */
const createNotification = async (req, data) => {
  const [result] = await db.execute(
    `INSERT INTO notifications (title, message, type, priority)
     VALUES (?, ?, ?, ?)`,
    [data.title, data.message, data.type, data.priority]
  );

  const notification = {
    id: result.insertId,
    ...data,
    is_read: false,
    created_at: new Date(),
  };

  // 🔥 Emit to admin room
  const io = req.app.get("io");
  if (io) {
    io.to("adminRoom").emit("adminNotification", notification);
  }

  return notification;
};

/* GET ALL */
const getAllNotifications = async () => {
  const [rows] = await db.execute(
    `SELECT * FROM notifications
     ORDER BY created_at DESC`
  );
  return rows;
};

/* GET UNREAD COUNT */
const getUnreadCount = async () => {
  const [rows] = await db.execute(
    `SELECT COUNT(*) as count
     FROM notifications
     WHERE is_read = FALSE`
  );
  return rows[0].count;
};

/* MARK ALL AS READ */
const markAllAsRead = async () => {
  await db.execute(
    `UPDATE notifications
     SET is_read = TRUE
     WHERE is_read = FALSE`
  );
};

module.exports = {
  createNotification,
  getAllNotifications,
  getUnreadCount,
  markAllAsRead,
};
