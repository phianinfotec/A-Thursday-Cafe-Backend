const service = require('../services/product.service');

/* ================= CREATE ================= */
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      earn_beans,
      redeem_beans,
      is_popular
    } = req.body;

    if (!name || !price || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing'
      });
    }

    const image = req.file
      ? `/assets/img/${req.file.filename}`
      : null;

    const id = await service.createProduct({
      name,
      description,
      price,
      category,
      earn_beans,
      redeem_beans,
      is_popular,
      image
    });

    res.status(201).json({
      success: true,
      message: 'Product created',
      data: { id }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= ADMIN GET ================= */
exports.getAdminProducts = async (req, res) => {
  try {
    const data = await service.getAdminProducts();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Fetch failed' });
  }
};

/* ================= USER GET ================= */
exports.getUserProducts = async (req, res) => {
  try {
    const data = await service.getUserProducts();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: 'Fetch failed' });
  }
};

/* ================= UPDATE ================= */
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      earn_beans,
      redeem_beans,
      is_popular,
      oldImage
    } = req.body;

    const image = req.file
      ? `/assets/uploads/products/${req.file.filename}`
      : oldImage;

    await service.updateProduct(req.params.id, {
      name,
      description,
      price,
      category,
      earn_beans,
      redeem_beans,
      is_popular,
      image
    });

    res.json({ success: true, message: 'Product updated' });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteProduct = async (req, res) => {
  try {
    await service.deleteProduct(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};



/* ================= POPULAR PRODUCTS (USER) ================= */
exports.getPopularProducts = async (req, res) => {
  try {
    const data = await service.getPopularProducts();

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Fetch popular products failed'
    });
  }
};
