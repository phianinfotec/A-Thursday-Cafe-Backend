const db = require("../config/db");

/* ===============================
   CREATE FEEDBACK (LOGIN USER)
================================ */
const createFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ message: "Invalid feedback" });
    }

    // 🔑 req.user.id comes from auth middleware
    await db.query(
      "INSERT INTO feedbacks (user_id, rating, message) VALUES (?, ?, ?)",
      [req.user.id, rating, message],
    );

    res.json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ message: "Database error" });
  }
};

/* ===============================
   USER - GET APPROVED FEEDBACKS
================================ */
const getAllFeedbacks = async (req, res) => {
  try {
    const sql = `
      SELECT
        f.id,
        f.rating,
        f.message,
        f.created_at,
        u.username AS name
      FROM feedbacks f
      JOIN users u ON u.id = f.user_id
      WHERE f.is_approved = 1
      ORDER BY f.created_at DESC
    `;

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ message: "Database error" });
  }
};

/* ===============================
   ADMIN - GET ALL FEEDBACKS
================================ */
const getAllFeedbacksAdmin = async (req, res) => {
  try {
    const sql = `
      SELECT
        f.id,
        f.rating,
        f.message,
        f.created_at,
        f.is_approved,
        u.username AS name
      FROM feedbacks f
      JOIN users u ON u.id = f.user_id
      ORDER BY f.created_at DESC
    `;

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ message: "Database error" });
  }
};
/* ===============================
   ADMIN - APPROVE FEEDBACK
================================ */
const approveFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `UPDATE feedbacks SET is_approved = 1 WHERE id = ?`,
      [id]
    );

    res.json({ message: 'Feedback approved successfully' });

  } catch (error) {
    console.error('DB ERROR:', error);
    res.status(500).json({ message: 'Database error' });
  }
};
/* ===============================
   ADMIN - REMOVE FEEDBACK
================================ */
const removeFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
     `UPDATE feedbacks SET is_approved = 0 WHERE id = ?`,
      [id]
    );

    res.json({ message: 'Feedback removed successfully' });

  } catch (error) {
    console.error('DB ERROR:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getAllFeedbacksAdmin,
  approveFeedback,
  removeFeedback
};
