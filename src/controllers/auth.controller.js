const db = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt");
const { generateOTP } = require("../services/otp.service");
const { sendOTPEmail } = require("../services/email.service");

/* ================= REGISTER ================= */
const register = async (req, res) => {
  try {
    const { username, email, mobile, password, confirmPassword } = req.body;

    if (!username || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password mismatch",
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email=? OR mobile=?",
      [email, mobile],
    );

    if (existing.length) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const [result] = await db.query(
      `INSERT INTO users 
       (username, email, mobile, password, otp, otp_expiry, is_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, email, mobile, hashedPassword, otp, otpExpiry, 0],
    );

    sendOTPEmail(email, otp);
    // TODO: Yaha email service se OTP send karo

    res.status(201).json({
      success: true,
      message: "OTP sent to your email. Valid for 10 minutes.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= VERIFY OTP ================= */
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (!rows.length) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];

    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // ✅ Mark user verified
    await db.query(
      "UPDATE users SET is_verified=1, otp=NULL, otp_expiry=NULL WHERE id=?",
      [user.id],
    );

    // 🔥 Add 100 Beans ONLY NOW
    await db.query(
      "INSERT INTO beans_wallet (user_id, collected, redeemed, available, level) VALUES (?, ?, ?, ?, ?)",
      [user.id, 100, 0, 100, "silver"],
    );

    res.json({
      success: true,
      message: "Registration completed 🎉 You earned 100 Beens!",
      beens: 100,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (!rows.length) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    // ✅ YAHAN LAGANA HAI
    if (!user.is_verified) {
      return res.status(401).json({
        message: "Please verify OTP before login",
      });
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGOUT ================= */
const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

/* ================= EXPORT ================= */
module.exports = {
  register,
  verifyOTP,
  login,
  logout,
};
