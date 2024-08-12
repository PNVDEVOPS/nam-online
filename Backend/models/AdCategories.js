import mongoose from 'mongoose';

const adcategorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true },
  // Другие поля категории
});

const AdCategoryModel = mongoose.model('AdCategory', adcategorySchema);

export default mongoose.model('AdCategory', adcategorySchema);