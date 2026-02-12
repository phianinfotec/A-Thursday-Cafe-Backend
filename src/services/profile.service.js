const db = require('../config/db');

/* ===============================
   USER PROFILE FULL DETAILS
=================================*/
exports.getProfile = async (userId) => {

  const [rows] = await db.query(`
    SELECT 
      u.id,
      u.username,
      u.email,
      u.mobile,

      w.collected,
      w.redeemed,
      w.available,
      w.level,

      o.id AS order_id,
      o.total_amount,
      o.status,
      o.created_at,

      oi.quantity,
      oi.final_price,
      oi.beans_earned,

      p.name AS product_name,
      p.image AS product_image

    FROM users u
    LEFT JOIN beans_wallet w ON w.user_id = u.id
    LEFT JOIN orders o ON o.user_id = u.id
    LEFT JOIN order_items oi ON oi.order_id = o.id
    LEFT JOIN products p ON p.id = oi.product_id

    WHERE u.id = ?
    ORDER BY o.created_at DESC
  `, [userId]);

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  const profile = {
    id: rows[0].id,
    name: rows[0].username,
    email: rows[0].email,
    mobile: rows[0].mobile,
    level: rows[0].level || null,
    beans: {
      collected: rows[0].collected || 0,
      redeemed: rows[0].redeemed || 0,
      available: rows[0].available || 0
    },
    orders: []
  };

  const orderMap = {};

  rows.forEach(row => {

    if (!row.order_id) return;

    if (!orderMap[row.order_id]) {
      orderMap[row.order_id] = {
        order_id: row.order_id,
        total_amount: row.total_amount,
        status: row.status,
        created_at: row.created_at,
        items: []
      };
    }

    if (row.product_name) {
      orderMap[row.order_id].items.push({
        product_name: row.product_name,
        product_image: row.product_image,
        quantity: row.quantity,
        final_price: row.final_price,
        beans_earned: row.beans_earned
      });
    }
  });

  profile.orders = Object.values(orderMap);

  return profile;
};


/* ===============================
   ADMIN - ALL USERS
=================================*/
exports.getAllUsers = async () => {
  const [rows] = await db.query(`
    SELECT 
      u.id,
      u.username,
      u.email,
      u.mobile,
      w.level,
      w.available
    FROM users u
    LEFT JOIN beans_wallet w ON w.user_id = u.id
    ORDER BY u.created_at DESC
  `);

  return rows;
};


/* ===============================
   ADMIN - SINGLE USER DETAIL
=================================*/
exports.getUserById = async (userId) => {
  return await exports.getProfile(userId);
};
