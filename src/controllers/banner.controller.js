const db = require('../config/db');

/* =========================
   ADMIN – GET ALL BANNERS
   ========================= */
exports.getAllBanners = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM banners ORDER BY id DESC'
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   FRONTEND – ACTIVE BANNER
   ========================= */
exports.getActiveBanner = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM banners
      WHERE is_active = 1
        AND start_time <= NOW()
        AND end_time >= NOW()
      ORDER BY id DESC
      LIMIT 1
    `);

    return res.status(200).json(rows|| null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   ADMIN – ADD BANNER
   ========================= */
exports.addBanner = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    if (!req.body) {
      return res.status(400).json({ message: 'FormData missing' });
    }

    const title = req.body.title;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const is_active = req.body.is_active ?? 1;

    if (!title || !start_time || !end_time) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const image_url = req.file
      ? `/assets/img/${req.file.filename}`
      : null;

    await db.query(
      `INSERT INTO banners
       (title, image_url, start_time, end_time, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [title, image_url, start_time, end_time, is_active]
    );

    return res.status(201).json({ message: 'Banner added successfully' });

  } catch (err) {
    console.error('ADD BANNER ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   ADMIN – UPDATE STATUS
   ========================= */
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    await db.query(
      'UPDATE banners SET is_active = ? WHERE id = ?',
      [is_active, id]
    );

    return res.json({ message: 'Status updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   ADMIN – DELETE BANNER
   ========================= */
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM banners WHERE id = ?', [id]);
    return res.json({ message: 'Banner deleted' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
