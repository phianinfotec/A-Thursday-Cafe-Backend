const db = require("../config/db");

exports.create = async (data) => {
  const [result] = await db.query(
    `INSERT INTO contact_us 
     (location, address, delivery_phone,alternet_number,attention_day, attention_time, image)
     VALUES (?, ?, ?, ?, ?,?,?)`,
    [
      data.location,
      data.address,
      data.delivery_phone,
      data.alternet_number,
      data.attention_day,
      data.attention_time,
      data.image,
    ]
  );
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM contact_us WHERE status=1 ORDER BY id DESC"
  );
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM contact_us WHERE id=? AND status=1",
    [id]
  );
  return rows[0];
};

exports.update = async (id, data) => {
  await db.query(
    `UPDATE contact_us
     SET location=?, address=?, delivery_phone=?,alternet_number=?,attention_day=?, attention_time=?, image=?
     WHERE id=?`,
    [
      data.location,
      data.address,
      data.delivery_phone,
      data.alternet_number,
      data.attention_day,
      data.attention_time,
      data.image,
      id,
    ]
  );
};

exports.remove = async (id) => {
  await db.query("UPDATE contact_us SET status=0 WHERE id=?", [id]);
};
