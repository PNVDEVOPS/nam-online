import BusModel from '../models/Bus.js';

export const getAll = async (req, res) => {
  try {
    const buses = await BusModel.find().exec();
    res.json(buses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить контакты',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new BusModel({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const bus = await doc.save();

    res.json(bus);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать контакт',
    });
  }
};

export const update = async (req, res) => {
  try {
    const busId = req.params.id;

    await BusModel.updateOne(
      {
        _id: busId,
      },
      {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        mail: req.body.mail,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить контакт',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const busId = req.params.id;

    const result = await BusModel.findOneAndDelete({
      _id: busId,
    });

    if (!result) {
      return res.status(404).json({
        message: 'Контакт не найден',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить контакт',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const busId = req.params.id;

    const bus = await BusModel.findById(busId).exec();

    if (!bus) {
      return res.status(404).json({
        message: 'Контакт не найден',
      });
    }

    res.json(bus);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить контакт',
    });
  }
};
