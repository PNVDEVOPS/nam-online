import MenuItem from "../models/MenuItem.js";

export const getMenuItems = async (req, res) => {
    try {
      const menuItems = await MenuItem.find();
      res.json(menuItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
export const createMenuItem = async (req, res) => {
    const menuItem = new MenuItem(req.body);
    try {
      const newMenuItem = await menuItem.save();
      res.status(201).json(newMenuItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
export const updateMenuItem = async (req, res) => {
    try {
      const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedMenuItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
export const deleteMenuItem = async (req, res) => {
    try {
      await MenuItem.findByIdAndDelete(req.params.id);
      res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
