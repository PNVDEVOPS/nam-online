import mongoose from 'mongoose';

const vacationcategorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true },
  // Другие поля категории
});

const VacationCategoryModel = mongoose.model('VacationCategory', vacationcategorySchema);

export default mongoose.model('VacationCategory', vacationcategorySchema);