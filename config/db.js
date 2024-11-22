const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(` Mongodb connected: ${conn.connection.host} `);
  } catch (error) {
    console.log('Database connection failed:', error);
    process.exit(1);
  }
};

mongoose.set('strictQuery', true);

module.exports = connectDB;
