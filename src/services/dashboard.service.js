const db = require("../config/db");

exports.getDashboardOverview = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [
    [ordersData],
    [earningsData],
    [latestCustomers]
  ] = await Promise.all([

    // Today's Orders Count
    db.execute(
      `SELECT COUNT(*) as total 
       FROM orders 
       WHERE created_at BETWEEN ? AND ?`,
      [todayStart, todayEnd]
    ),

    // Today's Earnings
    db.execute(
      `SELECT COALESCE(SUM(total_amount),0) as total 
       FROM orders 
       WHERE created_at BETWEEN ? AND ? 
       AND status='PAID'`,
      [todayStart, todayEnd]
    ),

    // Last 5 Customers
    db.execute(
      `SELECT id, username, email, mobile, created_at 
       FROM users 
       WHERE role='user' 
       ORDER BY created_at DESC 
       LIMIT 5`
    )
  ]);

  return {
    todaysOrders: ordersData[0].total,
    todaysEarnings: earningsData[0].total,
    last5Customers: latestCustomers
  };
};

exports.getCustomerDetails = async (userId) => {

  const [
    [user],
    [wallet],
    [orders]
  ] = await Promise.all([

    db.execute(
      `SELECT id, username, email, mobile, created_at 
       FROM users WHERE id=?`,
      [userId]
    ),

    db.execute(
      `SELECT collected, redeemed, available, level 
       FROM beans_wallet WHERE user_id=?`,
      [userId]
    ),

    db.execute(
      `SELECT id, total_amount, status, created_at 
       FROM orders 
       WHERE user_id=? 
       ORDER BY created_at DESC`,
      [userId]
    )
  ]);

  if (!user.length) return null;

  return {
    user: user[0],
    wallet: wallet[0] || {
      collected: 0,
      redeemed: 0,
      available: 0,
      level: "silver"
    },
    orders
  };
};
