const service = require('../services/profile.service');

/* USER PROFILE */
exports.getProfile = async (req, res) => {
  try {
    const data = await service.getProfile(req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ADMIN - ALL USERS */
exports.getAllUsers = async (req, res) => {
  try {
    const data = await service.getAllUsers();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ADMIN - USER DETAIL */
exports.getUserById = async (req, res) => {
  try {
    const data = await service.getUserById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
