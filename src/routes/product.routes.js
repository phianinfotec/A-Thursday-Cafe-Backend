const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const upload = require("../middlewares/upload.middleware");
const auth = require("../middlewares/auth.middleware");

/* ADMIN */
router.post("/", auth, upload.single("image"), controller.createProduct);
router.get("/admin", auth, controller.getAdminProducts);
router.put("/:id", auth, upload.single("image"), controller.updateProduct);
router.delete("/:id", auth, controller.deleteProduct);

/* USER */
router.get("/user", controller.getUserProducts);
router.get("/popular", controller.getPopularProducts); // ⭐ NEW

module.exports = router;
