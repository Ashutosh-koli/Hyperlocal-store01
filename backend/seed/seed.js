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

    console.log("🏪 Inserted Stores:");
    stores.forEach(s => console.log(`${s.name}: ${s._id}`));

    const [freshMart, organicHub, localGreens] = stores;

    const insertedProducts = await Product.insertMany([
      { name: 'Apple', price: 150, storeId: new mongoose.Types.ObjectId(freshMart._id) },
      { name: 'Banana', price: 50, storeId: new mongoose.Types.ObjectId(freshMart._id) },
    
      { name: 'Avocado', price: 200, storeId: new mongoose.Types.ObjectId(organicHub._id) },
      { name: 'Broccoli', price: 60, storeId: new mongoose.Types.ObjectId(organicHub._id) },
      { name: 'Sweet Potato', price: 40, storeId: new mongoose.Types.ObjectId(organicHub._id) },
    
      { name: 'Carrot', price: 30, storeId: new mongoose.Types.ObjectId(localGreens._id) },
      { name: 'Spinach', price: 25, storeId: new mongoose.Types.ObjectId(localGreens._id) },
      { name: 'Cabbage', price: 35, storeId: new mongoose.Types.ObjectId(localGreens._id) },
    ]);
    
    console.log("🛒 Inserted Products:");
    insertedProducts.forEach(p => {
      console.log(`${p.name} - ₹${p.price} - Store ID: ${p.storeId}`);
    });

    console.log('✅ Seed data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err.message);
    process.exit(1);
  }
};

run();
