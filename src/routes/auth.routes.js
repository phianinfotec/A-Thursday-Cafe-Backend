const express = require("express");
const { body } = require("express-validator");
const validate = require("../middlewares/validate.middleware");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/* ================= REGISTER ================= */
router.post(
  "/register",
  body("username").notEmpty(),
  body("email").isEmail(),
  body("mobile").isLength({ min: 10 }),
  body("password").isLength({ min: 6 }),
  validate,
  authController.register
);

/* ================= LOGIN ================= */
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  validate,
  authController.login
);

router.post("/verify-otp", authController.verifyOTP);
/* ================= LOGOUT ================= */
router.post("/logout", authController.logout);

module.exports = router;
