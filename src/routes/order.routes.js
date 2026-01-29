const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

// CUSTOMER BY MOBILE
router.get("/customer/:mobile", auth, OrderController.getCustomerByMobile);

// ORDER CRUD
router.post("/add_orders", auth, OrderController.create);
router.get("/orders", auth, OrderController.getAllOrders);
router.get("/orders/:id", auth, OrderController.getById);
router.get("/ordersDetails/:id", auth, OrderController.view);
router.put("/orders/:id", auth, OrderController.update);
router.delete("/orders/:id", auth, OrderController.delete);

module.exports = router;


