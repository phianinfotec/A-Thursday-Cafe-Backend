const service = require('../services/cart.service');

exports.addItem = async (req, res) => {
  const userId = 1;

  // ✅ req.body NOW WORKS after express.json()
  const { itemId, name, price, image } = req.body;

  if (!itemId) {
    return res.status(400).json({
      success: false,
      message: 'itemId is required'
    });
  }
 
  await service.addToCart({
    user_id: userId,
    item_id: itemId,   // ✅ snake_case for DB
    name,
    price: Number(price),
    image
  });

  res.json({ success: true, message: 'Item added to cart' });
};




exports.getCartItems = async (req, res) => {
  const data = await service.getCart(req.params.userId);
  res.json({ success: true, data });
};

exports.updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  await service.updateQty(req.params.id, quantity);
  res.json({ success: true });
};
