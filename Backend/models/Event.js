import mongoose from 'mongoose';

const EventShema = new mongoose.Schema(
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
    date: {
      type: Date,
      default: Date.now
    },
    phone: {
      type: String,

    },
    secondphone: {
      type: String,

    },

    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Event', EventShema);