const db = require('../config/db');

exports.addToCart = async (data) => {
  const { user_id, item_id, name, price, image } = data;

  const [existing] = await db.query(
    'SELECT * FROM cart WHERE user_id=? AND item_id=?',
    [user_id, item_id]
  );

  if (existing.length > 0) {
    await db.query(
      'UPDATE cart SET quantity = quantity + 1 WHERE id=?',
      [existing[0].id]
    );
  } else {
    await db.query(
      `INSERT INTO cart (user_id, item_id, name, price, image)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, item_id, name, price, image]
    );
  }
};


exports.getCart = async (user_id) => {
  const [rows] = await db.query(
    'SELECT * FROM cart WHERE user_id=?',
    [user_id]
  );
  return rows;
};

exports.updateQty = async (id, qty) => {
  await db.query(
    'UPDATE cart SET quantity=? WHERE id=?',
    [qty, id]
  );
};
