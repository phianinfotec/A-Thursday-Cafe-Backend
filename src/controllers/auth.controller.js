const db = require("../config/db");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../services/otp.service");
const { generateToken } = require("../config/jwt");

/* ================= SEND OTP ================= */
exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) {
    return res.status(400).json({ message: "Mobile is required" });
  }

  const otp = generateOTP();

  await db.query(
    `INSERT INTO users (mobile, otp)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE otp=?`,
    [mobile, otp, otp]
  );

  console.log("OTP:", otp); // SMS integration later

  res.status(200).json({
    success: true,
    message: "OTP sent successfully"
  });
};

/* ================= VERIFY OTP ================= */
exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: "Mobile and OTP required" });
  }

  const [rows] = await db.query(
    "SELECT id, username FROM users WHERE mobile=? AND otp=?",
    [mobile, otp]
  );

  if (!rows.length) {
    return res.status(401).json({
      message: "Invalid OTP"
    });
  }

  const user = rows[0];

  await db.query("UPDATE users SET otp=NULL WHERE id=?", [user.id]);

  const token = generateToken({
    userId: user.id,
    username: user.username
  });

  res.status(200).json({
    token
  });
};

/* ================= REGISTER ================= */
exports.register = async (req, res) => {


  try {
    const { username, email, mobile, password, confirmPassword } = req.body;

    // 🔒 Extra safety (even though validator already checks)
    if (!username || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match"
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ? OR mobile = ?",
      [email, mobile]
    );

    if (existing.length) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (username, email, mobile, password)
       VALUES (?, ?, ?, ?)`,
      [username, email, mobile, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


/* ================= LOGIN (EMAIL/PASSWORD) ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = generateToken({
      userId: user.id,
      username: user.username
    });

    res.status(200).json({
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGOUT ================= */
exports.logout = (req, res) => {
  // JWT is stateless → frontend removes token
  res.status(200).json({
    message: "Logout successful"
  });
};



/**
 * SEND OTP
 */
exports.sendUserOTP = async (req, res) => {
  const { mobile } = req.body;

  const [users] = await db.query(
    "SELECT id FROM users WHERE mobile = ?",
    [mobile]
  );

  if (!users.length) {
    return res.status(404).json({
      success: false,
      message: "User not registered"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  await db.query("DELETE FROM otps WHERE mobile = ?", [mobile]);

  await db.query(
    "INSERT INTO otps (mobile, otp, expires_at) VALUES (?, ?, ?)",
    [mobile, otp, expiry]
  );

  console.log("USER OTP:", otp); // 🔥 SMS gateway later

  res.json({
    success: true,
    message: "OTP sent successfully"
  });
};

/**
 * VERIFY OTP
 */
exports.verifyUserOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM otps WHERE mobile = ? AND otp = ?",
    [mobile, otp]
  );

  if (!rows.length) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP"
    });
  }

  if (new Date(rows[0].expires_at) < new Date()) {
    return res.status(400).json({
      success: false,
      message: "OTP expired"
    });
  }

  await db.query("DELETE FROM otps WHERE mobile = ?", [mobile]);

  // const token = jwt.sign(
  //   { mobile, role: "user" },
  //   JWT_SECRET,
  //   { expiresIn: "10m" }
  // );
    const token = generateToken({
    userId: user.id,
    username: user.username
  },JWT_SECRET,
  { expiresIn: "30m" }
);


  res.json({
    success: true,
    token,
    expiresIn: 600
  });
};

/**
 * USER PROFILE
 */
exports.userProfile = async (req, res) => {
  const [user] = await db.query(
    "SELECT id, name, mobile FROM users WHERE mobile = ?",
    [req.user.mobile]
  );

  res.json({
    success: true,
    user: user[0]
  });
};

