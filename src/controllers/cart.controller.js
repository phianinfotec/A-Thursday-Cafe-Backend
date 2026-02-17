const service = require('../services/cart.service');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { saucerId, quantity } = req.body;

    if (!saucerId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "SaucerId and quantity required"
      });
    }

    await service.addToCart(userId, saucerId, quantity);

    res.json({
      success: true,
      message: "Saucer added to cart"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Add to cart failed"
    });
  }
};



exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)

    const cartItems = await service.getCart(userId);

    if (!cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    res.json({
      success: true,
      totalAmount: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Checkout failed",
    });
  }
};

exports.getCartItems = async (req, res) => {
  try {

    const userId = req.user.id;

    const data = await service.getCart(userId);

    let totalAmount = 0;

    data.forEach(item => {
      totalAmount += item.saucer_price * item.quantity;
    });

    res.json({
      success: true,
      totalAmount,
      data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart"
    });
  }
};

exports.updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  await service.updateQty(req.params.id, quantity);
  res.json({ success: true });
};

exports.deleteItem = async (req, res) => {
  try {

    const userId = req.user.id;
    const cartId = req.params.id;

    await service.deleteItem(userId, cartId);

    res.json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.clearCart = async (req, res) => {
  try {

    const userId = req.user.id;
    console.log(userId)

    await service.clearCart(userId);

    res.json({
      success: true,
      message: "Cart cleared successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to clear cart"
    });
  }
};
