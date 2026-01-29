const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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

    // console.log("DECODED TOKEN =>", decoded); // ✅ MUST SHOW userId, username

    // 🔥 IMPORTANT FIX (MATCH TOKEN PAYLOAD)
    req.user = {
      id: decoded.userId,
      name: decoded.username
    };

    // console.log("REQ.USER SET =>", req.user); // ✅ MUST NOT BE undefined

    next();
  } catch (err) {
    console.error("AUTH ERROR =>", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
