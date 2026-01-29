const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query(
    'SELECT * FROM saucer_items WHERE status = 1'
  );
  return rows;
};

exports.create = async (data) => {
  const { name, price, description, image } = data;

  const [result] = await db.query(
    `INSERT INTO saucer_items (name, price, description, image)
     VALUES (?, ?, ?, ?)`,
    [name, price, description, image]
  );

  return result.insertId;
};

exports.update = async (id, data) => {
  const { name, price, description, image } = data;

  await db.query(
    `UPDATE saucer_items
     SET name=?, price=?, description=?, image=?
     WHERE id=?`,
    [name, price, description, image, id]
  );
};

exports.remove = async (id) => {
  await db.query(
    'DELETE FROM saucer_items WHERE id=?',
    [id]
  );
};
