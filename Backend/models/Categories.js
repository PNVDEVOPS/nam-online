import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true },
  // Другие поля категории
});

const CategoryModel = mongoose.model('Category', categorySchema);

export default mongoose.model('Category', categorySchema);