import mongoose from 'mongoose';

let isConnected = false; //track connection status, so we don't connect more than once

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      serverSelectionTimeoutMS: 3000000, // Set the server selection timeout to 30 seconds
    });

    isConnected = true;

    console.log('MongoDB Connected')

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Propagate the error to catch it in the calling code
  }
}
