const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const { name, products, total } = req.body;
  const order = new Order({ name, products, total });
  await order.save();
  res.json({ message: 'Order placed successfully!' });
};
