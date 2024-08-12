
import AdCategoryModel from '../models/AdCategories.js';

export const createAdCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const adcategory = new AdCategoryModel({ name });
    await adcategory.save();
    res.status(201).json(adcategory);
  } catch (error) {
    console.error('Ошибка при создании категории:', error);
    res.status(500).json({ message: 'Ошибка при создании категории' });
  }
};

export const getAllAdCategories = async (req, res) => {
  try {
    const adcategories = await AdCategoryModel.find();
    res.json(adcategories);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ message: 'Ошибка при получении категорий' });
  }
};

export const getAdCategoryById = async (req, res) => {
  try {
    const adcategoryId = req.params.id;
    const adcategory = await AdCategoryModel.findById(adcategoryId);
    if (!adcategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(adcategory);
  } catch (error) {
    console.error('Ошибка при получении категории:', error);
    res.status(500).json({ message: 'Ошибка при получении категории' });
  }
};

export const updateAdCategory = async (req, res) => {
  try {
    const adcategoryId = req.params.id;
    const { name } = req.body;
    const updatedAdCategory = await AdCategoryModel.findByIdAndUpdate(adcategoryId, { name }, { new: true });
    if (!updatedAdCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(updatedAdCategory);
  } catch (error) {
    console.error('Ошибка при обновлении категории:', error);
    res.status(500).json({ message: 'Ошибка при обновлении категории' });
  }
};

export const deleteAdCategory = async (req, res) => {
  try {
    const adcategoryId = req.params.id;
    const deletedAdCategory = await AdCategoryModel.findByIdAndDelete(adcategoryId);
    if (!deletedAdCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json({ message: 'Категория успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    res.status(500).json({ message: 'Ошибка при удалении категории' });
  }
};
