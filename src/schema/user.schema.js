import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    credibilityScore: {
      type: Number,
      default: 100,
      required: true,
    },
    contracts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
    },
  },
  { timestamps: true }
);

export const User = new mongoose.model('User', userSchema);
