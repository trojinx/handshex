import mongoose from 'mongoose';
import dotenv from 'dotenv';

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log('connected to DB successfully');
  } catch (error) {
    console.log(`error has occoured while connecting to Database:${error}`);
  }
}

export default connectDB;
