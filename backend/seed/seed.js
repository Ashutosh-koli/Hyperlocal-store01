const mongoose = require('mongoose');
const Store = require('../models/Store');
const Product = require('../models/Product');

const run = async () => {
  try {
    await mongoose.connect('mongodb+srv://Koli86:store@cluster0.fj0vfsl.mongodb.net/hyperlocal-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear old data
    await Store.deleteMany();
    await Product.deleteMany();

    // Insert stores
    const stores = await Store.insertMany([
      { name: 'Fresh Mart', location: 'MG Road' },
      { name: 'Organic Hub', location: 'Indiranagar' },
      { name: 'Local Greens', location: 'Koramangala' }
    ]);

    const [freshMart, organicHub, localGreens] = stores;

    // Insert products for each store
    await Product.insertMany([
      // Fresh Mart
      { name: 'Apple', price: 150, storeId: freshMart._id },
      { name: 'Banana', price: 50, storeId: freshMart._id },

      // Organic Hub
      { name: 'Avocado', price: 200, storeId: organicHub._id },
      { name: 'Broccoli', price: 60, storeId: organicHub._id },
      { name: 'Sweet Potato', price: 40, storeId: organicHub._id },

      // Local Greens
      { name: 'Carrot', price: 30, storeId: localGreens._id },
      { name: 'Spinach', price: 25, storeId: localGreens._id },
      { name: 'Cabbage', price: 35, storeId: localGreens._id },
    ]);

    console.log('✅ Seed data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err.message);
    process.exit(1);
  }
};

run();
