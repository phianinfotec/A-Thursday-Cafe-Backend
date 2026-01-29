const db = require('../config/db');

/* ===== PROFILE + BEANS ===== */
exports.getProfile = async (userId) => {
  const [rows] = await db.query(`
    SELECT u.name, w.collected, w.redeemed, w.available, w.level
    FROM users u
    JOIN beans_wallet w ON w.user_id = u.id
    WHERE u.id = ?
  `, [userId]);

  return {
    name: rows[0].name,
    level: rows[0].level,
    beans: {
      collected: rows[0].collected,
      redeemed: rows[0].redeemed,
      available: rows[0].available
    }
  };
};

/* ===== ORDER HISTORY (DAY / WEEK / MONTH) ===== */
exports.getOrders = async (userId, filter) => {

  let condition = '';

  if (filter === 'day') {
    condition = 'DATE(created_at) = CURDATE()';
  } else if (filter === 'week') {
    condition = 'YEARWEEK(created_at) = YEARWEEK(NOW())';
  } else {
    condition = 'MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())';
  }

  const [rows] = await db.query(`
    SELECT product_name, product_image, beans_plus, beans_minus, created_at
    FROM orders
    WHERE user_id = ? AND ${condition}
    ORDER BY created_at DESC
  `, [userId]);

  return rows.map(o => ({
    name: o.product_name,
    image: o.product_image,
    date: o.created_at,
    plus: o.beans_plus,
    minus: o.beans_minus
  }));
};
