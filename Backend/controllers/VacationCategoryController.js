
import VacationCategoryModel from '../models/VacationCategories.js';

export const createVacationCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const vacationcategory = new VacationCategoryModel({ name });
    await vacationcategory.save();
    res.status(201).json(vacationcategory);
  } catch (error) {
    console.error('Ошибка при создании категории:', error);
    res.status(500).json({ message: 'Ошибка при создании категории' });
  }
};

export const getAllVacationCategories = async (req, res) => {
  try {
    const vacationcategories = await VacationCategoryModel.find();
    res.json(vacationcategories);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ message: 'Ошибка при получении категорий' });
  }
};

export const getVacationCategoryById = async (req, res) => {
  try {
    const vacationcategoryId = req.params.id;
    const vacationcategory = await VacationCategoryModel.findById(vacationcategoryId);
    if (!vacationcategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(vacationcategory);
  } catch (error) {
    console.error('Ошибка при получении категории:', error);
    res.status(500).json({ message: 'Ошибка при получении категории' });
  }
};

export const updateVacationCategory = async (req, res) => {
  try {
    const vacationcategoryId = req.params.id;
    const { name } = req.body;
    const updatedVacationCategory = await VacationCategoryModel.findByIdAndUpdate(vacationcategoryId, { name }, { new: true });
    if (!updatedVacationCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(updatedVacationCategory);
  } catch (error) {
    console.error('Ошибка при обновлении категории:', error);
    res.status(500).json({ message: 'Ошибка при обновлении категории' });
  }
};

export const deleteVacationCategory = async (req, res) => {
  try {
    const vacationcategoryId = req.params.id;
    const deletedVacationCategory = await VacationCategoryModel.findByIdAndDelete(vacationcategoryId);
    if (!deletedVacationCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json({ message: 'Категория успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    res.status(500).json({ message: 'Ошибка при удалении категории' });
  }
};
