import mongoose from 'mongoose';

const tempUserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: Number,
      required: true,
    },
  },
  { timestaps: true }
);

export const TempUser = new mongoose.model('TempUser', tempUserSchema);
