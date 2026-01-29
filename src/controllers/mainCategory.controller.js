const MainCategoryService = require('../services/mainCategory.service');

exports.create = async (req, res) => {
  try {
    await MainCategoryService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Main Category created'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await MainCategoryService.getAll();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const data = await MainCategoryService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await MainCategoryService.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Main Category updated'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await MainCategoryService.delete(req.params.id);
    res.json({
      success: true,
      message: 'Main Category deleted'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
