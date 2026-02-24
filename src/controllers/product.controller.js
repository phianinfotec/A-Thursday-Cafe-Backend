const service = require("../services/product.service");

/* ================= CREATE ================= */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, is_popular, food_type } =
      req.body;

    if (!name || !description || !price || !category_id) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const image = req.file ? `/assets/img/${req.file.filename}` : null;

    const id = await service.createProduct({
      name,
      description,
      price,
      category_id,
      is_popular,
      image,
      food_type,
    });

    res.status(201).json({
      success: true,
      message: "Product created",
      data: { id },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= READ ALL (ADMIN) ================= */
exports.getAdminProducts = async (req, res) => {
  try {
    const data = await service.getAdminProducts();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= READ ONE ================= */
exports.getProductById = async (req, res) => {
  try {
    const data = await service.getProductById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category_id,
      is_popular,
      oldImage,
      food_type,
    } = req.body;

    const image = req.file ? `/assets/img/${req.file.filename}` : oldImage;

    await service.updateProduct(req.params.id, {
      name,
      description,
      price,
      category_id,
      is_popular,
      image,
      food_type,
    });

    res.json({
      success: true,
      message: "Product updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteProduct = async (req, res) => {
  try {
    await service.deleteProduct(req.params.id);

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= USER PRODUCTS ================= */
exports.getUserProducts = async (req, res) => {
  try {
    const data = await service.getUserProducts();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= POPULAR PRODUCTS ================= */
exports.getPopularProducts = async (req, res) => {
  try {
    const data = await service.getPopularProducts();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CATEGORY WISE PRODUCTS ================= */
exports.getCategoryWiseProducts = async (req, res) => {
  try {
    const type = req.query.type; // veg / nonveg / undefined

    const data = await service.getCategoryWiseProducts(type);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
