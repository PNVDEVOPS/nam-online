import AdModel from "../models/Ad.js";

// Получение последних тегов
export const getLastTags = async (req, res) => {
  try {
    const currentDate = new Date();
    const ads = await AdModel.find({ expiresAt: { $gt: currentDate } }).limit(5).exec();

    const tags = ads
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};

// Получение всех объявлений
export const getAll = async (req, res) => {
  try {
    const ads = await AdModel.find({ expiresAt: { $gt: new Date() } })
      .populate({ path: "user", select: ["name", "avatar"] })
      .populate('adcategory')
      .exec();

    res.json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить объявления",
    });
  }
};

// Получение одного объявления
export const getOne = (req, res) => {
  try {
    const adId = req.params.id;

    AdModel.findOneAndUpdate(
      {
        _id: adId,
        expiresAt: { $gt: new Date() },
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((ad) => {
      if (!ad) {
        return res.status(404).json({
          message: "Объявление не найдено или истекло",
        });
      }

      res.json(ad);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить объявление",
    });
  }
};

// Удаление объявления
export const remove = async (req, res) => {
  try {
    const adId = req.params.id;

    AdModel.findOneAndDelete({
      _id: adId,
    }).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Объявление не найдено",
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить объявление",
    });
  }
};

// Создание объявления
export const create = async (req, res) => {
  try {
    const { title, text, imageUrls, phone, price, adcategory, daysToExpire } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000); 

    // Проверяем, является ли дата корректной
    if (isNaN(expiresAt.valueOf())) {
      throw new Error("Некорректное количество дней до истечения");
    }

    const doc = new AdModel({
      title,
      text,
      imageUrls,
      user: req.userId,
      phone,
      price,
      adcategory,
      expiresAt,
    });

    const ad = await doc.save();

    res.json(ad);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

// Обновление объявления
export const update = async (req, res) => {
  try {
    const adId = req.params.id;
    const { title, text, imageUrls, phone, price, adcategory, daysToExpire } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000); 

    // Проверяем, является ли дата корректной
    if (isNaN(expiresAt.valueOf())) {
      throw new Error("Некорректное количество дней до истечения");
    }

    await AdModel.updateOne(
      {
        _id: adId,
      },
      {
        title,
        text,
        imageUrls,
        user: req.userId,
        phone,
        price,
        adcategory,
        expiresAt,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};
