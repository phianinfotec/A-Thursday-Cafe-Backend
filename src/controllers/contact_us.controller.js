const db = require('../config/db');
const nodemailer = require('nodemailer');

/* ============================
   SUBMIT CONTACT FORM
============================ */
exports.submitContact = async (req, res) => {

  try {

    const { name, circle, email, city, mobile, state, message } = req.body;

    // 🔎 VALIDATION
    if (!name || !circle || !email || !city || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile must be 10 digits"
      });
    }

    // 📌 SAVE IN DATABASE
    await db.query(
      `INSERT INTO contacts 
      (name, circle, email, city, mobile, state, message) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, circle, email, city, mobile, state, message]
    );

    // 📧 EMAIL SEND
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"A Thursday Café" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact - ${circle}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Circle:</b> ${circle}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>State:</b> ${state}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


/* ============================
   GET ALL CONTACTS (ADMIN)
============================ */
exports.getAllContacts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts"
    });
  }
};
