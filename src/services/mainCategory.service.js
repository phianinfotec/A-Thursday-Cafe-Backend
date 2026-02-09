const db = require('../config/db');

class MainCategoryService {

  // 🔥 simple in-memory cache
  static cache = null;
  static cacheTime = 0;
  static CACHE_TTL = 10000; // 10 seconds

  // ================= CREATE =================
  static async create(data) {
    const { name, slug, earn_beans = 0, redeem_beans = 0 } = data;

    const [result] = await db.query(
      `INSERT INTO main_categories 
       (name, slug, earn_beans, redeem_beans, status)
       VALUES (?, ?, ?, ?, 1)`,
      [name, slug, earn_beans, redeem_beans]
    );

    // cache clear
    this.cache = null;

    return result;
  }

  // ================= GET ALL (FAST) =================
  static async getAll() {
    const now = Date.now();

    // ✅ return cached data if valid
    if (this.cache && (now - this.cacheTime < this.CACHE_TTL)) {
      return this.cache;
    }

    const [rows] = await db.query(
      `SELECT id, name, earn_beans, redeem_beans
       FROM main_categories
       WHERE status = 1
       ORDER BY id DESC`
    );

    // save cache
    this.cache = rows;
    this.cacheTime = now;

    return rows;
  }

  // ================= GET ONE =================
  static async getById(id) {
    const [rows] = await db.query(
      `SELECT id, name, slug, earn_beans, redeem_beans
       FROM main_categories
       WHERE id = ? AND status = 1
       LIMIT 1`,
      [id]
    );

    return rows[0] || null;
  }

  // ================= UPDATE =================
  static async update(id, data) {
    const { name, slug, earn_beans = 0, redeem_beans = 0 } = data;

    const [result] = await db.query(
      `UPDATE main_categories
       SET name = ?, slug = ?, earn_beans = ?, redeem_beans = ?
       WHERE id = ?`,
      [name, slug, earn_beans, redeem_beans, id]
    );

    // cache clear
    this.cache = null;

    return result;
  }

  // ================= SOFT DELETE =================
  static async delete(id) {
    const [result] = await db.query(
      `UPDATE main_categories
       SET status = 0
       WHERE id = ?`,
      [id]
    );

    // cache clear
    this.cache = null;

    return result;
  }
}

module.exports = MainCategoryService;
