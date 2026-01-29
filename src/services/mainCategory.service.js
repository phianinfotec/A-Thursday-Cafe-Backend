const db = require('../config/db');

class MainCategoryService {

  static async create(data) {
    const { name, slug, earn_beans, redeem_beans } = data;
    const [result] = await db.query(
      `INSERT INTO main_categories (name, slug, earn_beans, redeem_beans)
       VALUES (?, ?, ?, ?)`,
      [name, slug, earn_beans, redeem_beans]
    );
    return result;
  }

  static async getAll() {
    const [rows] = await db.query(
      `SELECT * FROM main_categories WHERE status = 1`
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT * FROM main_categories WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, data) {
    const { name, slug, earn_beans, redeem_beans } = data;
    const [result] = await db.query(
      `UPDATE main_categories 
       SET name=?, slug=?, earn_beans=?, redeem_beans=?
       WHERE id=?`,
      [name, slug, earn_beans, redeem_beans, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.query(
      `UPDATE main_categories SET status = 0 WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = MainCategoryService;
