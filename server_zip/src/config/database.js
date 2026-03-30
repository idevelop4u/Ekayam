const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI || 'mongodb+srv://puspal23bhi10088_db_user:TheDev1oper070801@community-app.iizv2rh.mongodb.net/?appName=community-app';
    
    // Use Memory Server if in testing mode where MongoDB isn't available
    if (process.env.USE_MEMORY_DB === 'true') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
      console.log('Using MongoDB Memory Server at:', mongoURI);
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;