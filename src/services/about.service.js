const db = require('../config/db');

exports.create = async (data) => {
  const [result] = await db.query(
    'INSERT INTO about_us (title, description, image) VALUES (?, ?, ?)',
    [data.title, data.description, data.image]
  );
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query(
    'SELECT * FROM about_us WHERE status=1 ORDER BY id DESC'
  );
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM about_us WHERE id=? AND status=1',
    [id]
  );
  return rows[0];
};

exports.update = async (id, data) => {
  await db.query(
    'UPDATE about_us SET title=?, description=?, image=? WHERE id=?',
    [data.title, data.description, data.image, id]
  );
};

exports.remove = async (id) => {
  await db.query(
    'UPDATE about_us SET status=0 WHERE id=?',
    [id]
  );
};
