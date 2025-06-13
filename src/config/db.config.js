import dotenv from "dotenv";
import mongoose from "mongoose";

async function connectDB() {
  try {
    mongoose.connect();
  } catch (error) {
    console.log(`error has occoured while connecting to Database:${error}`);
  }
}

export default connectDB;
