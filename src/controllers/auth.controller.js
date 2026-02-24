const db = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt");
const { generateOTP } = require("../services/otp.service");
const { sendOTPEmail } = require("../services/email.service");
const { createNotification } = require("../services/notification.service");
const useragent = require("useragent");
const geoip = require("geoip-lite");
const crypto = require("crypto");

/* ================= HELPER FUNCTIONS ================= */

// ✅ Get Real Client IP
function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    req.ip ||
    null
  );
}

// ✅ Private IP Checker (Correct Range)
function isPrivateIp(ip) {
  if (!ip) return true;

  return (
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("172.17.") ||
    ip.startsWith("172.18.") ||
    ip.startsWith("172.19.") ||
    ip.startsWith("172.2") // covers 172.20–29
  );
}

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
      [email, mobile]
    );

    if (existing.length) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      `INSERT INTO users 
       (username, email, mobile, password, otp, otp_expiry, is_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, email, mobile, hashedPassword, otp, otpExpiry, 0]
    );

    sendOTPEmail(email, otp);

    res.status(201).json({
      success: true,
      message: "OTP sent to your email. Valid for 10 minutes.",
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= VERIFY OTP ================= */

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (!rows.length) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    if (user.is_verified) {
      return res.status(400).json({ success: false, message: "Already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    await db.query(
      "UPDATE users SET is_verified=1, otp=NULL, otp_expiry=NULL WHERE id=?",
      [user.id]
    );

    await createNotification(req, {
      title: "New User Registered 🎉",
      message: `User ${user.username} (${user.mobile}) completed registration`,
      type: "NEW_USER",
      priority: "MEDIUM",
    });

    await db.query(
      "INSERT INTO beans_wallet (user_id, collected, redeemed, available, level) VALUES (?, ?, ?, ?, ?)",
      [user.id, 100, 0, 100, "silver"]
    );

    res.json({
      success: true,
      message: "Registration completed 🎉 You earned 100 Beans!",
      beans: 100,
    });

  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= LOGIN ================= */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ip = getClientIp(req);
    const agent = useragent.parse(req.headers["user-agent"]);

    const deviceType =
      agent.device?.toString() === "Other 0.0.0"
        ? "Desktop"
        : agent.device?.toString();

    const browser = agent.family || "Unknown";
    const os = agent.os?.toString() || "Unknown";

    let city = "Local";
    let country = "Local";

    if (ip && !isPrivateIp(ip)) {
      const geo = geoip.lookup(ip);
      city = geo?.city || "Unknown";
      country = geo?.country || "Unknown";
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    let loginStatus = "FAILED";
    let userId = null;
    const sessionId = crypto.randomUUID();

    if (rows.length) {
      const user = rows[0];
      userId = user.id;

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch && user.is_verified) {
        loginStatus = "SUCCESS";

        const token = generateToken({
          userId: user.id,
          username: user.username,
          sessionId,
        });

        await db.query(
          `INSERT INTO user_activity_logs
           (user_id, email, login_time, ip_address, city, country,
            device_type, browser, os, login_status, session_id)
           VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            email,
            ip,
            city,
            country,
            deviceType,
            browser,
            os,
            loginStatus,
            sessionId,
          ]
        );

        return res.json({
          token,
          user: {
            id: user.id,
            name: user.username,
            email: user.email,
            phone: user.mobile,
          },
        });
      }
    }

    // Failed Login Log
    await db.query(
      `INSERT INTO user_activity_logs
       (user_id, email, login_time, ip_address, city, country,
        device_type, browser, os, login_status, session_id)
       VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        email,
        ip,
        city,
        country,
        deviceType,
        browser,
        os,
        loginStatus,
        sessionId,
      ]
    );

    return res.status(401).json({ message: "Invalid email or password" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGOUT ================= */

const logout = async (req, res) => {
  try {
    const sessionId = req.user?.sessionId;

    if (!sessionId) {
      return res.status(400).json({ message: "Session not found" });
    }

    const [rows] = await db.query(
      "SELECT login_time FROM user_activity_logs WHERE session_id=? AND logout_time IS NULL LIMIT 1",
      [sessionId]
    );

    if (!rows.length) {
      return res.json({ message: "Already logged out" });
    }

    const loginTime = new Date(rows[0].login_time);
    const duration = Math.floor((Date.now() - loginTime.getTime()) / 1000);

    await db.query(
      `UPDATE user_activity_logs
       SET logout_time=NOW(),
           session_duration=?
       WHERE session_id=?`,
      [duration, sessionId]
    );

    res.json({ message: "Logout successful" });

  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Logout error" });
  }
};

/* ================= EXPORT ================= */

module.exports = {
  register,
  verifyOTP,
  login,
  logout,
};