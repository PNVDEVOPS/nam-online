import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: [String],
    adcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'AdCategory' },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Ad', AdSchema);
