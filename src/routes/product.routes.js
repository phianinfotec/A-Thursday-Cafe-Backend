const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/product.controller");
const adminAuth = require("../middlewares/adminAuth.middleware");

/* ================= USER ROUTES ================= */
router.get("/user", controller.getUserProducts);
router.get("/popular", controller.getPopularProducts);

/* ================= ADMIN ROUTES ================= */
router.post("/", adminAuth, upload.single("image"), controller.createProduct);
router.get("/admin", adminAuth, controller.getAdminProducts);
router.get("/:id", adminAuth, controller.getProductById);
router.put("/:id", adminAuth, upload.single("image"), controller.updateProduct);
router.delete("/:id", adminAuth, controller.deleteProduct);

module.exports = router;
