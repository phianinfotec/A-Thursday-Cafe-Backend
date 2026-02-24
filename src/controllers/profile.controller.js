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


exports.updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const imagePath = `/assets/img/${req.file.filename}`;

    const data = await service.updateProfilePic(
      req.user.id,
      imagePath
    );

    res.json({
      success: true,
      message: "Profile picture updated",
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};