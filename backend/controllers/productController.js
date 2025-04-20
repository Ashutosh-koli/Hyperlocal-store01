const Product = require('../models/Product');

const getProductsByStore = async (req, res) => {
  try {
    const products = await Product.find({ storeId: req.params.storeId });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

module.exports = { getProductsByStore };
