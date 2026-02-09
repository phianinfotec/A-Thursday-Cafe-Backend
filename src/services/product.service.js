const db = require('../config/db');

/* ================= CREATE ================= */
exports.createProduct = async (data) => {
  const {
    name,
    description,
    price,
    category,
    earn_beans,
    redeem_beans,
    is_popular,
    image,
  } = data;

  const sql = `
    INSERT INTO products
    (name, description, price, category, earn_beans, redeem_beans, is_popular, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    name,
    description,
    price,
    category,
    earn_beans ?? 0,
    redeem_beans ?? 0,
    Number(is_popular) || 0,
    image,
  ]);

  return result.insertId;
};

/* ================= UPDATE ================= */
exports.updateProduct = async (id, data) => {
  const {
    name,
    description,
    price,
    category,
    earn_beans,
    redeem_beans,
    is_popular,
    image,
  } = data;

  let sql = `
    UPDATE products SET
      name = ?,
      description = ?,
      price = ?,
      category = ?,
      earn_beans = ?,
      redeem_beans = ?,
      is_popular = ?
  `;

  const values = [
    name,
    description,
    price,
    category,
    earn_beans ?? 0,
    redeem_beans ?? 0,
    Number(is_popular) || 0,
  ];

  if (image) {
    sql += `, image = ?`;
    values.push(image);
  }

  sql += ` WHERE id = ?`;
  values.push(id);

  await db.query(sql, values);
};

/* ================= DELETE ================= */
exports.deleteProduct = async (id) => {
  await db.query(`DELETE FROM products WHERE id = ?`, [id]);
};

/* =====================================================
   🔐 ADMIN PANEL – FULL DATA
===================================================== */
exports.getAdminProducts = async () => {
  const [rows] = await db.query(`
    SELECT
      p.id,
      p.name,
      c.name AS category,
      p.price,
      p.earn_beans,
      p.redeem_beans,
      p.is_popular,
      p.status
    FROM products p
    LEFT JOIN categories c ON c.id = p.category
    ORDER BY p.created_at DESC
  `);

  return rows;
};

/* =====================================================
   👤 USER PANEL – PUBLIC DATA
===================================================== */
exports.getUserProducts = async () => {
  const [rows] = await db.query(`
    SELECT
      name,
      description,
      price,
      image
    FROM products
    WHERE status = 1
    ORDER BY created_at DESC
  `);

  return rows;
};


/* =====================================================
   ⭐ USER – POPULAR PRODUCTS
===================================================== */
exports.getPopularProducts = async () => {
  const [rows] = await db.query(`
    SELECT
      name,
      description,
      price,
      image
    FROM products
    WHERE status = 1
      AND is_popular = 1
    ORDER BY created_at DESC
  `);

  return rows;
};


exports.getProductsWithBeans = async ()=> {
  const [rows] = await db.query(`
    SELECT
      p.id,
      p.name,
      p.price,
      c.earn_percent,
      c.redeem_percent
    FROM products p
    JOIN categories c ON c.id=p.category_id
  `);

  return rows;
}
