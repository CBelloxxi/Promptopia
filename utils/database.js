import mongoose from 'mongoose';

let isConnected = false; //track connection status, so we don't connect more than once

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MondoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB Connected')
    
  } catch (error) {
    console.log(error);
  }
}
