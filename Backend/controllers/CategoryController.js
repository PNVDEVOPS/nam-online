
import CategoryModel from '../models/Categories.js';

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new CategoryModel({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Ошибка при создании категории:', error);
    res.status(500).json({ message: 'Ошибка при создании категории' });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ message: 'Ошибка при получении категорий' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(category);
  } catch (error) {
    console.error('Ошибка при получении категории:', error);
    res.status(500).json({ message: 'Ошибка при получении категории' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, { name }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(updatedCategory);
  } catch (error) {
    console.error('Ошибка при обновлении категории:', error);
    res.status(500).json({ message: 'Ошибка при обновлении категории' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json({ message: 'Категория успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    res.status(500).json({ message: 'Ошибка при удалении категории' });
  }
};
