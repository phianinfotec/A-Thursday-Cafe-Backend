// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const path = require("path");

// // serve images
// app.use("/assets", express.static(path.join(__dirname, "assets")));

// const authRoutes = require("./routes/auth.routes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", authRoutes);

// module.exports = app;

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 FIXED STATIC ASSETS (IMPORTANT)
app.use("/assets", express.static(path.join(__dirname, "assets")));

console.log(
  path.join(__dirname, "assets", "img", "1768545081693-products-coffee-1.webp"),
);
// ROUTES
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
const mainCategoryService = require("./routes/mainCategory.routes");

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
app.use("/api", mainCategoryService)

module.exports = app;
