const db = require('../config/db');

/* ================= CREATE ================= */
exports.createCategory = async (data) => {
  const sql = `
    INSERT INTO categories (name, main_category_id)
    VALUES (?, ?)
  `;

  const [result] = await db.query(sql, [
    data.name,
    data.main_category_id
  ]);

  return result;
};

/* ================= READ ================= */
exports.getAllCategories = async () => {
  const sql = `
    SELECT 
      c.id AS category_id,
      c.name AS category_name,
      mc.id AS main_category_id,
      mc.name AS main_category_name,
      mc.earn_beans,
      mc.redeem_beans
    FROM categories c
    JOIN main_categories mc 
      ON mc.id = c.main_category_id
    ORDER BY c.id DESC
  `;

  const [rows] = await db.query(sql);
  return rows;
};

/* ================= UPDATE ================= */
exports.updateCategory = async (id, data) => {
  const sql = `
    UPDATE categories
    SET name = ?, main_category_id = ?
    WHERE id = ?
  `;

  await db.query(sql, [
    data.name,
    data.main_category_id,
    id
  ]);
};

/* ================= DELETE ================= */
exports.deleteCategory = async (id) => {
  await db.query('DELETE FROM categories WHERE id = ?', [id]);
};
