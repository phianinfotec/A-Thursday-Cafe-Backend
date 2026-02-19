const db = require("../config/db");

/* ================= CREATE ================= */
exports.createProduct = async (data) => {
  const { name, description, price, category_id, is_popular, image } = data;

  const [result] = await db.execute(
    `
    INSERT INTO products
    (name, description, price, category_id, is_popular, image, status)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `,
    [name, description, price, category_id, Number(is_popular) || 0, image],
  );

  return result.insertId;
};

/* ================= READ ALL (ADMIN) ================= */
exports.getAdminProducts = async () => {
  const [rows] = await db.execute(`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.is_popular,
      p.status,
      c.name AS category_name,
      mc.name AS main_category_name,
      mc.earn_beans,
      mc.redeem_beans
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN main_categories mc ON mc.id = c.main_category_id
    ORDER BY p.created_at DESC
  `);

  return rows;
};

/* ================= READ ONE ================= */
exports.getProductById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT
      p.*,
      c.name AS category_name,
      mc.name AS main_category_name,
      mc.earn_beans,
      mc.redeem_beans
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN main_categories mc ON mc.id = c.main_category_id
    WHERE p.id = ?
    LIMIT 1
  `,
    [id],
  );

  return rows[0] || null;
};

/* ================= UPDATE ================= */
exports.updateProduct = async (id, data) => {
  const { name, description, price, category_id, is_popular, image } = data;

  let sql = `
    UPDATE products SET
      name = ?,
      description = ?,
      price = ?,
      category_id = ?,
      is_popular = ?
  `;

  const values = [
    name,
    description,
    price,
    category_id,
    Number(is_popular) || 0,
  ];

  if (image) {
    sql += ", image = ?";
    values.push(image);
  }

  sql += " WHERE id = ?";
  values.push(id);

  await db.execute(sql, values);
};

/* ================= DELETE ================= */
exports.deleteProduct = async (id) => {
  await db.execute(`DELETE FROM products WHERE id = ?`, [id]);
};

/* ================= USER PRODUCTS ================= */
/* ================= USER PRODUCTS ================= */
exports.getUserProducts = async () => {
  const [rows] = await db.execute(`
    SELECT
      -- Product Info
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.is_popular,

      -- Category Info
      c.id AS category_id,
      c.name AS category_name,

      -- Main Category Info
      mc.id AS main_category_id,
      mc.name AS main_category_name,
      mc.earn_beans,
      mc.redeem_beans,

   
    -- Calculated Beans (2 Decimal Format)
    ROUND((p.price * mc.earn_beans) / 100, 2) AS calculated_earn_beans,
    ROUND((p.price * mc.redeem_beans) / 100, 2) AS calculated_redeem_beans

    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN main_categories mc ON mc.id = c.main_category_id

    WHERE p.status = 1
    ORDER BY p.created_at DESC
  `);

  return rows;
};

/* ================= POPULAR PRODUCTS ================= */
/* ================= POPULAR PRODUCTS ================= */
exports.getPopularProducts = async () => {
  const [rows] = await db.execute(`
    SELECT
      -- Product Info
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.is_popular,

      -- Category Info
      c.id AS category_id,
      c.name AS category_name,

      -- Main Category Info
      mc.id AS main_category_id,
      mc.name AS main_category_name,
      mc.earn_beans,
      mc.redeem_beans,

      -- Calculated Beans
      FLOOR((p.price * mc.earn_beans) / 100) AS calculated_earn_beans,
      FLOOR((p.price * mc.redeem_beans) / 100) AS calculated_redeem_beans

    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN main_categories mc ON mc.id = c.main_category_id

    WHERE p.status = 1
      AND p.is_popular = 1

    ORDER BY p.created_at DESC
  `);

  return rows;
};
