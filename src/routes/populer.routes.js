const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/populer.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, upload.single("image"), controller.createPopular);
router.get("/", controller.getPopular);
router.put("/:id", auth, upload.single("image"), controller.updatePopular);
router.delete("/:id", auth, controller.deletePopular);

module.exports = router;
