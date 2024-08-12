
import CafeCategoryModel from '../models/CafeCategories.js';

export const createCafeCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const cafecategory = new CafeCategoryModel({ name });
    await cafecategory.save();
    res.status(201).json(cafecategory);
  } catch (error) {
    console.error('Ошибка при создании категории:', error);
    res.status(500).json({ message: 'Ошибка при создании категории' });
  }
};

export const getAllCafeCategories = async (req, res) => {
  try {
    const cafecategories = await CafeCategoryModel.find();
    res.json(cafecategories);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ message: 'Ошибка при получении категорий' });
  }
};

export const getCafeCategoryById = async (req, res) => {
  try {
    const cafecategoryId = req.params.id;
    const cafecategory = await CategoryModel.findById(cafecategoryId);
    if (!cafecategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(cafecategory);
  } catch (error) {
    console.error('Ошибка при получении категории:', error);
    res.status(500).json({ message: 'Ошибка при получении категории' });
  }
};

export const updateCafeCategory = async (req, res) => {
  try {
    const cafecategoryId = req.params.id;
    const { name } = req.body;
    const updatedCafeCategory = await CafeCategoryModel.findByIdAndUpdate(cafecategoryId, { name }, { new: true });
    if (!updatedCafeCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(updatedCafeCategory);
  } catch (error) {
    console.error('Ошибка при обновлении категории:', error);
    res.status(500).json({ message: 'Ошибка при обновлении категории' });
  }
};

export const deleteCafeCategory = async (req, res) => {
  try {
    const cafecategoryId = req.params.id;
    const deletedCafeCategory = await CafeCategoryModel.findByIdAndDelete(cafecategoryId);
    if (!deletedCafeCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json({ message: 'Категория успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    res.status(500).json({ message: 'Ошибка при удалении категории' });
  }
};
