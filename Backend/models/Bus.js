import mongoose from 'mongoose';

const BusShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Bus', BusShema);