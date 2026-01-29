const service = require('../services/category.service');

/* CREATE */
exports.create = async (req, res) => {
  try {
    const { name, main_category_id } = req.body;

    if (!name || !main_category_id) {
      return res.status(400).json({
        success: false,
        message: 'Name and Main Category are required'
      });
    }

    const result = await service.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: 'Category created',
      id: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

/* READ */
exports.getAll = async (req, res) => {
  try {
    const data = await service.getAllCategories();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    await service.updateCategory(req.params.id, req.body);
    res.json({ success: true, message: 'Category updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

/* DELETE */
exports.remove = async (req, res) => {
  try {
    await service.deleteCategory(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
