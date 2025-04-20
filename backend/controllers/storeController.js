const Store = require('../models/Store');

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.json(stores);
};
