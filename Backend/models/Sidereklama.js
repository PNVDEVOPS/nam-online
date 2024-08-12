import mongoose from 'mongoose';

const SidereklamaSchema = new mongoose.Schema(
  {
    href: {
      type: String,
      required: true,
    },
    imageUrl: String,
    expiresAt: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Sidereklama', SidereklamaSchema);