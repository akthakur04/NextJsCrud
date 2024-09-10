import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState !== 1) {
    // If not connected, connec
    console.log(process.env.MONGODB_URI)
    await mongoose.disconnect(); // Explicitly disconnect first to avoid conflicts
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'myapp', // Explicitly specify the database name
    });
    console.log('MongoDB Reconnected to myapp');
  } else {
    console.log('MongoDB already connected');
  }
};

export default connectMongo;
