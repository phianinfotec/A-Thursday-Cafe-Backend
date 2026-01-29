const service = require('../services/profile.service');

/* ===== GET PROFILE ===== */
exports.getProfile = async (req, res) => {
  try {
    const data = await service.getProfile(req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===== GET ORDERS ===== */
exports.getOrders = async (req, res) => {
  try {
    const filter = req.query.filter || 'day';
    const data = await service.getOrders(req.user.id, filter);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
