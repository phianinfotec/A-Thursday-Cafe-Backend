const service = require("../services/contact.service");

exports.createContact = async (req, res) => {
  try {
    const {
      location,
      address,
      delivery_phone,
      alternet_number,
      attention_day,
      attention_time,
    } = req.body;

    if (!location || !address) {
      return res.status(400).json({
        success: false,
        message: "Location and address are required",
      });
    }

    const image = req.file
      ? `/assets/uploads/contact/${req.file.filename}`
      : null;

    const id = await service.create({
      location,
      address,
      delivery_phone,
      alternet_number,
      attention_day,
      attention_time,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Contact created",
      data: { id },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { location, address, delivery_phone, attention_time, oldImage } =
      req.body;

    if (!location || !address) {
      return res.status(400).json({
        success: false,
        message: "Location and address required",
      });
    }

    const image = req.file
      ? `/assets/uploads/contact/${req.file.filename}`
      : oldImage;

    await service.update(req.params.id, {
      location,
      address,
      delivery_phone,
      attention_day,
      attention_time,
      image,
    });

    res.json({
      success: true,
      message: "Contact updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({
      success: true,
      message: "Contact deleted",
    });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
