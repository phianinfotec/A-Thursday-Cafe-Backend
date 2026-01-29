const service = require('../services/about.service');

exports.createAbout = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const image = req.file
      ? `/assets/uploads/about/${req.file.filename}`
      : null;

    const id = await service.create({ title, description, image });

    res.status(201).json({
      success: true,
      message: 'About created',
      data: { id }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getAboutList = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Fetch failed' });
  }
};

exports.getAboutById = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'About not found'
      });
    }
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Fetch failed' });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { title, description, oldImage } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description required'
      });
    }

    const image = req.file
      ? `/assets/uploads/about/${req.file.filename}`
      : oldImage;

    await service.update(req.params.id, {
      title,
      description,
      image
    });

    res.json({
      success: true,
      message: 'About updated'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({
      success: true,
      message: 'About deleted'
    });
  } catch {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};
