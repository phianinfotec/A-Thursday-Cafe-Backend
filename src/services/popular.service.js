const db = require('../config/db');

exports.create = async (data) => {
  const [result] = await db.query(
    `INSERT INTO popular_products (name, description, price, image)
     VALUES (?, ?, ?, ?)`,
    [data.name, data.description, data.price, data.image]
  );
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query(
    `SELECT id, name, description, price, image
     FROM popular_products
     WHERE status = 1
     ORDER BY id DESC`
  );
  return rows;
};

exports.update = async (id, data) => {

    // console.log(data)

    // console.log(id)
  let sql = 'UPDATE popular_products SET name=?, description=?, price=?';
  const values = [data.name, data.description, data.price];

  if (data.image) {
    sql += ', image=?';
    values.push(data.image);
  }

  sql += ' WHERE id=?';
  values.push(id);

  await db.query(sql, values);
};

exports.remove = async (id) => {
  await db.query(
    'UPDATE popular_products SET status=0 WHERE id=?',
    [id]
  );
};
