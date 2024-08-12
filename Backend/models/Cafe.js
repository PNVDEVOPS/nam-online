import mongoose from 'mongoose';

const { Schema } = mongoose; // Деструктуризация для получения доступа к Schema

const CafeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  cafecategories: [{ type: Schema.Types.ObjectId, ref: 'CafeCategory' }],
  time: { type: String },
  contact: {
    address: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
  },
  avatar: { type: String }, // Ссылка на аватар кафе
  menu: { type: String } // Ссылка на изображение меню
});

export default mongoose.model('Cafe', CafeSchema);