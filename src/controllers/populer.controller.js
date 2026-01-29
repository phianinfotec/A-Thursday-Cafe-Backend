const popularService = require('../services/popular.service');

exports.createPopular = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, description and price are required'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const imagePath = `/assets/img/${req.file.filename}`;

    const id = await popularService.create({
      name,
      description,
      price,
      image: imagePath
    });

    res.status(201).json({
      success: true,
      message: 'Popular product created',
      data: { id, name, description, price, image: imagePath }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Server error'
    });
  }
};

exports.getPopular = async (req, res) => {
  try {
    const data = await popularService.getAll();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
};

exports.updatePopular = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? `/assets/img/${req.file.filename}` : null;

    await popularService.update(req.params.id, {
      name,
      description,
      price,
      image
    });

    res.json({ success: true, message: 'Popular product updated' });
  } catch {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

exports.deletePopular = async (req, res) => {
  try {
    await popularService.remove(req.params.id);
    res.json({ success: true, message: 'Popular product deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};
