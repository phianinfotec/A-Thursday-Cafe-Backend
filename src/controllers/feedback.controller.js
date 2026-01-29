const db = require('../config/db');

/* ===============================
   CREATE FEEDBACK (LOGIN USER)
================================ */
const createFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ message: 'Invalid feedback' });
    }

    // 🔑 req.user.id comes from auth middleware
    await db.query(
      'INSERT INTO feedbacks (user_id, rating, message) VALUES (?, ?, ?)',
      [req.user.id, rating, message]
    );

    res.json({ message: 'Feedback submitted successfully' });

  } catch (error) {
    console.error('DB ERROR:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

/* ===============================
   GET FEEDBACKS WITH USER NAME
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
      ORDER BY f.created_at DESC
    `;

    const [rows] = await db.query(sql);
    res.json(rows);

  } catch (error) {
    console.error('DB ERROR:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks
};
