const Product = require('../models/Product');

exports.getProductsByStore = async (req, res) => {
  const products = await Product.find({ storeId: req.params.storeId });
  res.json(products);
};
