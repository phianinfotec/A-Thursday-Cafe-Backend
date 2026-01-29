const OrderService = require("../services/order.service");

class OrderController {
  // ===============================
  // GET CUSTOMER BY MOBILE
  // ===============================
  static async getCustomerByMobile(req, res) {
    try {
      const { mobile } = req.params;

      const customer = await OrderService.getCustomerByMobile(mobile);

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.json({
        success: true,
        data: customer,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // ===============================
  // CREATE ORDER
  // ===============================
  // static async create(req, res) {
  //   try {
  //     const { items } = req.body;
  //     const userId = req.user.id;

  //     if (!items || !Array.isArray(items) || items.length === 0) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Order items required"
  //       });
  //     }

  //     const result = await OrderService.createOrder({ userId, items });

  //     res.status(201).json({
  //       success: true,
  //       message: "Order created successfully",
  //       ...result
  //     });

  //   } catch (err) {
  //     res.status(500).json({ success: false, message: err.message });
  //   }
  // }

  //   static async create(req, res) {
  //   try {
  //     const { customer_mobile, items, total_amount, beans_earned, beans_deducted } = req.body;

  //     if (!customer_mobile || !items || items.length === 0) {
  //       return res.status(400).json({ success: false, message: 'Invalid order data' });
  //     }

  //     const orderId = await OrderService.createOrder({
  //       user_id: req.user.id,
  //       customer_mobile,
  //       total_amount,
  //       beans_earned,
  //       beans_deducted,
  //       items
  //     });

  //     res.json({ success: true, order_id: orderId });
  //   } catch (err) {
  //     res.status(500).json({ success: false, message: err.message });
  //   }
  // }
  static async create(req, res) {
    try {
      const { mobile, items, total_amount, beans_earned, beans_deducted } =
        req.body;

      if (!mobile || !items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid order data",
        });
      }

      // ❌ user_id yahan mat bhejo
      const orderId = await OrderService.createOrder({
        mobile,
        total_amount,
        beans_earned,
        beans_deducted,
        items,
      });

      res.json({
        success: true,
        order_id: orderId,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async getOrderDetails(req, res) {
    try {
      const orderId = req.params.id;

      const rows = await OrderService.getOrderDetails(orderId);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Order level data (same for all rows)
      const order = {
        id: rows[0].order_id,
        customer_name: rows[0].username,
        mobile: rows[0].mobile,
        total_amount: rows[0].total_amount,
        beans_earned: rows[0].beans_earned,
        beans_deducted: rows[0].beans_deducted,
        status: rows[0].status,
        created_at: rows[0].created_at,
        items: [],
      };

      rows.forEach((r) => {
        order.items.push({
          product_name: r.product_name,
          quantity: r.quantity,
          price: r.final_price,
          total: r.quantity * r.final_price,
          beans_earned: r.item_beans,
        });
      });

      res.json({ success: true, data: order });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // ===============================
  // GET ALL ORDERS (LIST PAGE)
  // ===============================
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json({ success: true, data: orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
  // ===============================
  // GET ORDER BY ID
  // ===============================
  static async getById(req, res) {
    const data = await OrderService.getOrderById(req.params.id);
    res.json({ success: true, data });
  }

  static async view(req, res) {
    try {
      const orderId = req.params.id;

      const data = await OrderService.getOrderDetails(orderId);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  // ===============================
  // UPDATE ORDER
  // ===============================
  static async update(req, res) {
    const data = await OrderService.updateOrder(req.params.id, req.body.items);
    res.json({ success: true, message: "Order updated", data });
  }

  // ===============================
  // DELETE ORDER
  // ===============================
static async delete(req, res) {
   try {
    const { id } = req.params;

    // TODO: delete order from DB here

    return res.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

}

module.exports = OrderController;
