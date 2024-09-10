import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState !== 1) {
    // If not connected, connect
    await mongoose.disconnect(); // Explicitly disconnect first
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Reconnected');
  } else {
    console.log('MongoDB already connected');
  }
};

export default connectMongo;
