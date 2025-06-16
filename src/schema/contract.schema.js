import mongoose from "mongoose";
import { User } from "./user.schema.js";
const contractSchema = new mongoose.Schema(
  {
    contractname: {
      type: String,
      required: true,
      unique: true,
    },
    contractID: {
      type: String,
      required: true,
      unique: true,
    },
    contractBody: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    contractMaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contractReciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Contract = new mongoose.model("Contract", contractSchema);
