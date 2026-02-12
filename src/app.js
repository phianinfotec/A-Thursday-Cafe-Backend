const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* -------------------- CORE MIDDLEWARE -------------------- */
app.use(cors());

// 🔥 VERY IMPORTANT (form-data + json both)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* -------------------- STATIC FILES -------------------- */
// app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(
  "/assets",
  express.static(path.join(__dirname, "assets"))
);

/* -------------------- DEBUG (temporary) -------------------- */
app.use((req, res, next) => {
  // console.log("➡️", req.method, req.originalUrl);
  next();
});

/* -------------------- ROUTES -------------------- */
const homeRoutes = require("./routes/home.routes");
const authRoutes = require("./routes/auth.routes");
const populerRoutes = require("./routes/populer.routes");
const aboutRoutes = require("./routes/about.routes");
const productRoutes = require("./routes/product.routes");
const contactRoutes = require("./routes/contact.routes");
const profileRoutes = require("./routes/profile.routes");
const orderRoutes = require("./routes/order.routes");
const categoryRoutes = require("./routes/category.routes");
const saucerRoutes = require("./routes/saucer.routes");
const cartRoutes = require("./routes/cart.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const blogRoutes = require("./routes/blog.routes");
const mainCategoryRoutes = require("./routes/mainCategory.routes");
const bannerRoutes = require("./routes/banner.routes");
const contactusRoutes = require("./routes/contact_us.routes");

app.use("/api", saucerRoutes);
app.use("/api", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/popular", populerRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/product", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", profileRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", blogRoutes);
app.use("/api", mainCategoryRoutes);
app.use("/api", bannerRoutes);
app.use("/api", contactusRoutes);

/* -------------------- GLOBAL ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
