const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"A Thursday Cafe ☕" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for Registration",
    html: `
      <h2>Welcome to A Thursday Cafe ☕</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
    `
  });
};
