const db = require('../config/db');

/* ===============================
   ADD BLOG (LOGIN REQUIRED)
================================ */
const addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content || !req.file) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount > 300) {
      return res.status(400).json({ message: 'Max 300 words allowed' });
    }

    await db.query(
      `INSERT INTO blogs (user_id, title, image, content)
       VALUES (?, ?, ?, ?)`,
      [
        req.user.id,
        title,
        req.file.filename,
        content
      ]
    );

    res.json({ message: 'Blog submitted for approval' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ===============================
   GET APPROVED BLOGS (PUBLIC)
================================ */
const getBlogs = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        b.id,
        b.title,
        b.image,
        b.content,
        b.created_at,
        u.username AS author
      FROM blogs b
      JOIN users u ON u.id = b.user_id
      WHERE b.is_approved = 1
      ORDER BY b.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addBlog, getBlogs };
