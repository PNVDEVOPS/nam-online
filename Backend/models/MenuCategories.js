import mongoose from 'mongoose';

const MenuCategorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true },
  // Другие поля категории
});

const CategoryModel = mongoose.model('MenuCategory', MenuCategorySchema);

export default mongoose.model('MenuCategory', MenuCategorySchema);