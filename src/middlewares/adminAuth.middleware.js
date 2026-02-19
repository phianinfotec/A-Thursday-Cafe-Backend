const jwt = require("jsonwebtoken");
const db = require("../config/db");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or invalid"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Token payload must contain userId
    const [user] = await db.execute(
      "SELECT id, role FROM users WHERE id = ?",
      [decoded.userId]
    );

    if (!user.length) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    if (user[0].role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only"
      });
    }

    req.admin = user[0];

    next();
  } catch (err) {
    console.error("ADMIN AUTH ERROR =>", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = adminAuth ;
