import mongoose from "mongoose";
import { User } from "./user.schema.js";
const contractSchema = new mongoose.Schema(
  {
    contractName: {
      type: String,
      required: true,
      unique: true,
    },
    contractBody: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
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
    contractMakerEmail: {
      type: String,
    },
    contractRecieverEmail: {
      type: String,
    },
    contractMakerUsername: {
      type: String,
    },
    contractRecieverUsername: {
      type: String,
    },
    contractStatus: {
      type: String,
      enum: ["Active", "Not Verified", "Expired"],
      required: true,
      default: "Not Verified",
    },
  },
  { timestamps: true }
);
export const Contract = new mongoose.model("Contract", contractSchema);
