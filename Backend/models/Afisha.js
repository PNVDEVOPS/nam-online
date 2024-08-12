import mongoose from 'mongoose';

const AfishaShema = new mongoose.Schema(
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
    director: {
      type: String,

    },
    country: {
      type: String,

    },
    role: {
      type: String,

    },
    phone: {
      type: String,

    },
    secondphone: {
      type: String,

    },
    mon: {
      type: String,

    },
    tue: {
      type: String,

    },
    wed: {
      type: String,

    },
    thu: {
      type: String,
     
    },
    fri: {
      type: String,

    },
    sat: {
      type: String,

    },
    sun: {
      type: String,

    },

    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Afisha', AfishaShema);