import mongoose from 'mongoose';

let isConnected = false;

export const connectToOrderDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URL) throw new Error('MONGO_URL is not defined in the environment variables.');

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log('Order service connected to MongoDB.');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
