import Menu from '../models/Menu.js';

export const getMenu = async (req, res) => {
    try {
      const menu = await Menu.findById(req.params.id).populate('items');
      res.json(menu);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const createMenu = async (req, res) => {
    const menu = new Menu(req.body);
    try {
      const newMenu = await menu.save();
      res.status(201).json(newMenu);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  export const updateMenu = async (req, res) => {
    try {
      const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedMenu);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  export const deleteMenu = async (req, res) => {
    try {
      await Menu.findByIdAndDelete(req.params.id);
      res.json({ message: 'Menu deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  