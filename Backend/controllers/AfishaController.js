import AfishaModel from "../models/Afisha.js";

export const getLastTags = async (req, res) => {
  try {
    const afishas = await AfishaModel.find().limit(5).exec();
    const aftags = afishas.map((obj) => obj.aftags).flat().slice(0, 5);
    res.json(aftags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить тэги",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const afishas = await AfishaModel.find()
      .populate({ path: "user", select: ["name", "avatar"] })
      .exec();
    res.json(afishas);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить афишу",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const afishaId = req.params.id;
    const afisha = await AfishaModel.findOneAndUpdate(
      { _id: afishaId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    ).exec();

    if (!afisha) {
      return res.status(404).json({
        message: "Афиша не найдена",
      });
    }

    res.json(afisha);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить афишу",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const afishaId = req.params.id;
    const doc = await AfishaModel.findOneAndDelete({ _id: afishaId }).exec();

    if (!doc) {
      return res.status(404).json({
        message: "Афиша не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить афишу",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new AfishaModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      director: req.body.director,
      role: req.body.role,
      length: req.body.length,
      country: req.body.country,
      phone: req.body.phone,
      secondPhone: req.body.secondPhone,
      mon: req.body.mon,
      tue: req.body.tue,
      wed: req.body.wed,
      thu: req.body.thu,
      fri: req.body.fri,
      sat: req.body.sat,
      sun: req.body.sun,
    });

    const afisha = await doc.save();
    res.json(afisha);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать афишу",
    });
  }
};

export const update = async (req, res) => {
  try {
    const afishaId = req.params.id;

    await AfishaModel.updateOne(
      { _id: afishaId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        aftags: req.body.aftags ? req.body.aftags.split(",") : [],
        director: req.body.director,
        role: req.body.role,
        length: req.body.length,
        country: req.body.country,
        phone: req.body.phone,
        secondPhone: req.body.secondPhone,
        mon: req.body.mon,
        tue: req.body.tue,
        wed: req.body.wed,
        thu: req.body.thu,
        fri: req.body.fri,
        sat: req.body.sat,
        sun: req.body.sun,
      }
    ).exec();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить афишу",
    });
  }
};
