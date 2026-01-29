const db = require("../config/db");

class OrderService {
  // CUSTOMER BY MOBILE
  static async getCustomerByMobile(mobile) {
    const [[user]] = await db.query(
      "SELECT id, username FROM users WHERE mobile = ?",
      [mobile],
    );
    return user;
  }

  // CREATE ORDER
  // static async createOrder({ userId, items }) {
  //   let total = 0;

  //   for (const i of items) {
  //     total += i.final_price * i.quantity;
  //   }
  //   console.log("Total Order Amount:", total);

  //   const [order] = await db.query(
  //     "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
  //     [userId, total],
  //   );

  //   for (const i of items) {
  //     await db.query(
  //       `INSERT INTO order_items (order_id, product_id, final_price, quantity)
  //        VALUES (?, ?, ?, ?)`,
  //       [order.insertId, i.product_id, i.final_price, i.quantity],
  //     );
  //   }

  //   return { order_id: order.insertId, total };
  // }

  //   static async createOrder(data) {
  //   const conn = await db.getConnection();
  //   await conn.beginTransaction();

  //   try {
  //     const [orderRes] = await conn.query(
  //       `INSERT INTO orders
  //       (user_id, customer_mobile, total_amount, beans_earned, beans_deducted, status)
  //       VALUES (?, ?, ?, ?, ?, 'PENDING')`,
  //       [
  //         data.user_id,
  //         data.customer_mobile,
  //         data.total_amount,
  //         data.beans_earned,
  //         data.beans_deducted
  //       ]
  //     );

  //     const orderId = orderRes.insertId;

  //     for (const item of data.items) {
  //       await conn.query(
  //         `INSERT INTO order_items
  //         (order_id, product_id, qty, price, total)
  //         VALUES (?, ?, ?, ?, ?)`,
  //         [orderId, item.product_id, item.qty, item.price, item.total]
  //       );
  //     }

  //     await conn.commit();
  //     return orderId;

  //   } catch (e) {
  //     await conn.rollback();
  //     throw e;
  //   } finally {
  //     conn.release();
  //   }
  // }

  static async createOrder(data) {
    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
      /* 🔹 STEP 1: FIND USER BY MOBILE */
      const [users] = await conn.query(
        "SELECT id FROM users WHERE mobile = ?",
        [data.mobile],
      );

      if (users.length === 0) {
        throw new Error("Customer not found");
      }

      const userId = users[0].id;

      /* 🔹 STEP 2: INSERT ORDER */
      const [orderRes] = await conn.query(
        `INSERT INTO orders
       (user_id, total_amount, beans_earned, beans_deducted, total_beans, status)
       VALUES (?, ?, ?, ?, ?, 'PENDING')`,
        [
          userId,
          data.total_amount,
          data.beans_earned,
          data.beans_deducted,
          data.beans_earned - data.beans_deducted,
        ],
      );

      const orderId = orderRes.insertId;

      /* 🔹 STEP 3: INSERT ORDER ITEMS */
      for (const item of data.items) {
        await conn.query(
          `INSERT INTO order_items
         (order_id, product_id, quantity, final_price)
         VALUES (?, ?, ?, ?)`,
          [orderId, item.product_id, item.quantity, item.final_price],
        );
      }

      await conn.commit();
      return orderId;
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  }

  static async getOrderDetails(orderId) {
    const [rows] = await db.query(
      `
    SELECT 
      o.id AS order_id,
      o.total_amount,
      o.beans_earned,
      o.beans_deducted,
      o.status,
      o.created_at,

      u.username,
      u.mobile,

      oi.product_id,
      oi.quantity,
      oi.final_price,
      oi.beans_earned AS item_beans,

      p.name AS product_name

    FROM orders o
    JOIN users u ON u.id = o.user_id
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    WHERE o.id = ?
    `,
      [orderId],
    );

    return rows;
  }

  // ===============================
  // GET ALL ORDERS
  // ===============================
  static async getAllOrders() {
    const [rows] = await db.query(`
      SELECT
        o.id,
        o.user_id,
        u.username AS username,
        u.mobile AS customer_mobile,
        o.total_amount,
        o.beans_earned,
        o.beans_deducted,
        o.total_beans,
        o.status,
        o.created_at
      FROM orders o
      JOIN users u ON u.id = o.user_id
      ORDER BY o.id DESC
    `);

    return rows;
  }

  static async getOrderById(id) {
    const [[order]] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);
    return order;
  }

static async getOrderDetails(orderId) {
  const [rows] = await db.query(
    `
    SELECT
      o.id AS order_id,
      o.total_amount,
      o.beans_earned,
      o.beans_deducted,
      o.status,
      o.created_at,

      u.username,
      u.mobile,

      oi.quantity,
      oi.final_price,
      p.name AS product_name

    FROM orders o
    JOIN users u ON u.id = o.user_id
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    WHERE o.id = ?
    `,
    [orderId]
  );

  return rows;
}


  // UPDATE
  static async updateOrder(id, items) {
    await db.query("DELETE FROM order_items WHERE order_id = ?", [id]);

    let total = 0;
    for (const i of items) {
      total += i.final_price * i.quantity;
      await db.query(
        `INSERT INTO order_items (order_id, product_id, final_price, quantity)
         VALUES (?, ?, ?, ?)`,
        [id, i.product_id, i.final_price, i.quantity],
      );
    }

    await db.query("UPDATE orders SET total_amount = ? WHERE id = ?", [
      total,
      id,
    ]);

    return { id, total };
  }

  // DELETE
 static async deleteOrder(orderId) {
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    // 1️⃣ delete order items first
    await conn.query(
      'DELETE FROM order_items WHERE order_id = ?',
      [orderId]
    );

    // 2️⃣ delete order
    await conn.query(
      'DELETE FROM orders WHERE id = ?',
      [orderId]
    );

    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

}

module.exports = OrderService;
