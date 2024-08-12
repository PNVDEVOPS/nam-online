import ContactModel from '../models/Contact.js';

export const getAll = async (req, res) => {
  try {
    const contacts = await ContactModel.find().exec();
    res.json(contacts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить контакты',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ContactModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      phone: req.body.phone,
      secondPhone: req.body.secondPhone,
      mail: req.body.mail,
      user: req.userId,
    });

    const contact = await doc.save();

    res.json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать контакт',
    });
  }
};

export const update = async (req, res) => {
  try {
    const contactId = req.params.id;

    await ContactModel.updateOne(
      {
        _id: contactId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        phone: req.body.phone,
        secondPhone: req.body.secondPhone,
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
    const contactId = req.params.id;

    const result = await ContactModel.findOneAndDelete({
      _id: contactId,
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
    const contactId = req.params.id;

    const contact = await ContactModel.findById(contactId).exec();

    if (!contact) {
      return res.status(404).json({
        message: 'Контакт не найден',
      });
    }

    res.json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить контакт',
    });
  }
};
