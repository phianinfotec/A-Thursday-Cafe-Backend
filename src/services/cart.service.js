const db = require('../config/db');

exports.addToCart = async (userId, saucerId, quantity) => {

  const [existing] = await db.query(
    'SELECT * FROM cart WHERE user_id=? AND saucer_id=?',
    [userId, saucerId]
  );

  if (existing.length > 0) {
    await db.query(
      'UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND saucer_id=?',
      [quantity, userId, saucerId]
    );
  } else {
    await db.query(
      'INSERT INTO cart (user_id, saucer_id, quantity) VALUES (?, ?, ?)',
      [userId, saucerId, quantity]
    );
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(`
      SELECT 
        cart.id,
        cart.quantity,
        saucers.name,
        saucers.price,
        saucers.image
      FROM cart
      JOIN saucers ON cart.saucer_id = saucers.id
      WHERE cart.user_id = ?
    `, [userId]);

    let total = 0;

    rows.forEach(item => {
      total += item.price * item.quantity;
    });

    res.json({
      success: true,
      items: rows,
      totalAmount: total
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart"
    });
  }
};


exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    await db.query(
      'UPDATE cart SET quantity=? WHERE id=?',
      [quantity, req.params.id]
    );

    res.json({
      success: true,
      message: "Quantity updated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed"
    });
  }
};


exports.getCart = async (user_id) => {

  const [rows] = await db.query(`
    SELECT 
      cart.id AS cart_id,
      cart.quantity,

      users.username AS user_name,
      users.email AS user_email,
      users.mobile AS user_mobile,

      saucer_items.id AS saucer_id,
      saucer_items.name AS saucer_name,
      saucer_items.image AS saucer_image,
      saucer_items.price AS saucer_price

    FROM cart

    JOIN users ON cart.user_id = users.id
    JOIN saucer_items ON cart.saucer_id = saucer_items.id

    WHERE cart.user_id = ?
  `, [user_id]);

  return rows;
};

exports.updateQty = async (id, qty) => {
  await db.query(
    'UPDATE cart SET quantity=? WHERE id=?',
    [qty, id]
  );
};

exports.deleteItem = async (user_id, cart_id) => {

  const [existing] = await db.query(
    'SELECT * FROM cart WHERE id=? AND user_id=?',
    [cart_id, user_id]
  );

  if (existing.length === 0) {
    throw new Error("Cart item not found");
  }

  await db.query(
    'DELETE FROM cart WHERE id=? AND user_id=?',
    [cart_id, user_id]
  );

  return true;
};

exports.clearCart = async (user_id) => {

  await db.query(
    'DELETE FROM cart WHERE user_id=?',
    [user_id]
  );

  return true;
};
