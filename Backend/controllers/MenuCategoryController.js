
import MenuCategoryModel from '../models/MenuCategories.js';

export const createMenuCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const menucategory = new MenuCategoryModel({ name });
    await menucategory.save();
    res.status(201).json(menucategory);
  } catch (error) {
    console.error('Ошибка при создании категории:', error);
    res.status(500).json({ message: 'Ошибка при создании категории' });
  }
};

export const getAllMenuCategories = async (req, res) => {
  try {
    const menucategories = await MenuCategoryModel.find();
    res.json(menucategories);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ message: 'Ошибка при получении категорий' });
  }
};

export const getMenuCategoryById = async (req, res) => {
  try {
    const menucategoryId = req.params.id;
    const menucategory = await CategoryModel.findById(menucategoryId);
    if (!menucategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(menucategory);
  } catch (error) {
    console.error('Ошибка при получении категории:', error);
    res.status(500).json({ message: 'Ошибка при получении категории' });
  }
};

export const updateMenuCategory = async (req, res) => {
  try {
    const menucategoryId = req.params.id;
    const { name } = req.body;
    const updatedMenuCategory = await MenuCategoryModel.findByIdAndUpdate(menucategoryId, { name }, { new: true });
    if (!updatedMenuCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json(updatedMenuCategory);
  } catch (error) {
    console.error('Ошибка при обновлении категории:', error);
    res.status(500).json({ message: 'Ошибка при обновлении категории' });
  }
};

export const deleteMenuCategory = async (req, res) => {
  try {
    const menucategoryId = req.params.id;
    const deletedMenuCategory = await MenuCategoryModel.findByIdAndDelete(menucategoryId);
    if (!deletedMenuCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json({ message: 'Категория успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    res.status(500).json({ message: 'Ошибка при удалении категории' });
  }
};
