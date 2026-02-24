const db = require("../config/db");

/* ================= CREATE ================= */
exports.createProduct = async (data) => {
  const {
    name,
    description,
    price,
    category_id,
    is_popular,
    image,
    food_type,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO products
    (name, description, price, category_id, is_popular, image, status, food_type)
    VALUES (?, ?, ?, ?, ?, ?, 1,?)
  `,
    [
      name,
      description,
      price,
      category_id,
      Number(is_popular) || 0,
      image,
      food_type,
    ],
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
      p.food_type,
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
  const {
    name,
    description,
    price,
    category_id,
    is_popular,
    image,
    food_type,
  } = data;

  let sql = `
    UPDATE products SET
      name = ?,
      description = ?,
      price = ?,
      category_id = ?,
      is_popular = ?,
      food_type= ?
  `;

  const values = [
    name,
    description,
    price,
    category_id,
    Number(is_popular) || 0,
    food_type, // ✅ ADD THIS
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

/* ================= CATEGORY WISE PRODUCTS ================= */
exports.getCategoryWiseProducts = async (type) => {
  let sql = `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.is_popular,
      p.food_type,

      c.id AS category_id,
      c.name AS category_name,

      mc.name AS main_category_name,
      mc.earn_beans,
      mc.redeem_beans,

      ROUND((p.price * mc.earn_beans) / 100, 2) AS calculated_earn_beans,
      ROUND((p.price * mc.redeem_beans) / 100, 2) AS calculated_redeem_beans

    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN main_categories mc ON mc.id = c.main_category_id

    WHERE p.status = 1
  `;

  const values = [];

  // ✅ FILTER LOGIC
  if (type === "veg" || type === "nonveg") {
    sql += ` AND p.food_type = ?`;
    values.push(type);
  }

  sql += ` ORDER BY c.id, p.created_at DESC`;

  const [rows] = await db.execute(sql, values);

  // Grouping
  const grouped = {};

  rows.forEach((row) => {
    if (!grouped[row.category_id]) {
      grouped[row.category_id] = {
        category_id: row.category_id,
        category_name: row.category_name,
        main_category_name: row.main_category_name,
        products: [],
      };
    }

    grouped[row.category_id].products.push({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      image: row.image,
      is_popular: row.is_popular,
      food_type: row.food_type,
      calculated_earn_beans: row.calculated_earn_beans,
      calculated_redeem_beans: row.calculated_redeem_beans,
    });
  });

  return Object.values(grouped);
};
