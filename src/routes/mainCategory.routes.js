const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/mainCategory.controller");
const auth = require("../middlewares/auth.middleware");

// ADMIN APIs
router.post("/main-categories", auth, ctrl.create);
router.get("/main-categories", ctrl.getAll);
router.get("/main-categories/:id", ctrl.getOne);
router.put("/main-categories/:id", auth, ctrl.update);
router.delete("/main-categories/:id", auth, ctrl.delete);

module.exports = router;
