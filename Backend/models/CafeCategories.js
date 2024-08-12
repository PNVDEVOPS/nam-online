import mongoose from 'mongoose';

const CafeCategorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true },
  // Другие поля категории
});

const CategoryModel = mongoose.model('CafeCategory', CafeCategorySchema);

export default mongoose.model('CafeCategory', CafeCategorySchema);