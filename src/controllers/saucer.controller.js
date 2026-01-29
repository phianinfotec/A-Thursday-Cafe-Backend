const service = require('../services/saucer.service');

exports.getSaucerItems = async (req, res) => {
  const data = await service.getAll();
  res.json({ success: true, data });
};

exports.createSaucerItem = async (req, res) => {
  const id = await service.create(req.body);
  res.status(201).json({ success: true, id });
};

exports.updateSaucerItem = async (req, res) => {
  await service.update(req.params.id, req.body);
  res.json({ success: true, message: 'Saucer item updated' });
};

exports.deleteSaucerItem = async (req, res) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Saucer item deleted' });
};
