import mongoose from 'mongoose';

const VacationSchema = new mongoose.Schema(
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
    mail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: [String],
    vacationcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'VacationCategory' },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Vacation', VacationSchema);
