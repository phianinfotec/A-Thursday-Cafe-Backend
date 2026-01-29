const express = require("express");
const { body } = require("express-validator");
const validate = require("../middlewares/validate.middleware");
const {
  sendOTP,
  verifyOTP,
  register,
  login,
  logout,
  verifyUserOTP,
  sendUserOTP,
  userProfile
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/send-otp",
  body("mobile")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile must be 10 digits"),
  validate,
  sendUserOTP
);

router.post(
  "/verify-otp",
  body("mobile")
    .isLength({ min: 10, max: 10 }),
  body("otp")
    .isLength({ min: 6, max: 6 }),
  validate,
  verifyUserOTP
);


router.get(
  "/profile",
  authMiddleware,
  userProfile
);


// Register
router.post(
  "/register",
  body("username").notEmpty(),
  body("email").isEmail(),
  body("mobile").isLength({ min: 10 }),
  body("password").isLength({ min: 6 }),
  validate,
  register
);

// Login (email/password OR mobile)
router.post(
  "/login",
  body("email").optional().isEmail(),
  body("password").optional().isLength({ min: 6 }),
  body("mobile").optional().isLength({ min: 10 }),
  validate,
  login
);


router.post('/logout', logout);

module.exports = router;
