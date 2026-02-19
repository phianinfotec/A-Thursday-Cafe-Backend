const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const adminAuth  = require("../middlewares/adminAuth.middleware");

router.get("/dashboard", adminAuth, dashboardController.getDashboard);

router.get("/customers/:id", adminAuth, dashboardController.getCustomerDetails);

module.exports = router;
