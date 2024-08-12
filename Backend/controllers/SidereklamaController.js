import SidereklamaModel from "../models/Sidereklama.js";

// Получение последних тегов
export const getLastTags = async (req, res) => {
  try {
    const currentDate = new Date(); // Текущая дата
    const sidereklamas = await SidereklamaModel.find({
      expiresAt: { $gt: currentDate } // Проверяем, что дата истечения позже текущей даты
    }).limit(5).exec();

    const tags = sidereklamas
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

// Получение всех баннеров
export const getAll = async (req, res) => {
  try {
    const sidereklamas = await SidereklamaModel.find({ expiresAt: { $gt: new Date() } });

    res.json(sidereklamas);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить баннеры",
    });
  }
};

// Получение одного баннера
export const getOne = (req, res) => {
  try {
    const sidereklamaId = req.params.id;

    SidereklamaModel.findOneAndUpdate(
      {
        _id: sidereklamaId,
        expiresAt: { $gt: new Date() }, // Убедимся, что баннер еще не истек
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((sidereklama) => {
      if (!sidereklama) {
        return res.status(404).json({
          message: "Баннер не найден или истек",
        });
      }

      res.json(sidereklama);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "не удалось получить баннер",
    });
  }
};

// Удаление баннера
export const remove = async (req, res) => {
  try {
    const sidereklamaId = req.params.id;

    SidereklamaModel.findOneAndDelete({
      _id: sidereklamaId,
    }).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Баннер не найден",
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить баннер",
    });
  }
};

// Создание баннера
export const create = async (req, res) => {
  try {
    const { imageUrl, href, duration } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + duration * 24 * 60 * 60 * 1000); // Установить истечение через указанное количество дней

    const doc = new SidereklamaModel({
      imageUrl,
      href,
      expiresAt,
      user: req.userId // Используем user ID из токена
    });

    const sidereklama = await doc.save();

    res.json(sidereklama);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать баннер",
    });
  }
};

// Обновление баннера
export const update = async (req, res) => {
  try {
    const sidereklamaId = req.params.id;
    const { imageUrl, href, duration } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + duration * 24 * 60 * 60 * 1000); // Установить истечение через указанное количество дней

    const updatedSidereklama = await SidereklamaModel.findByIdAndUpdate(
      sidereklamaId,
      {
        imageUrl,
        href,
        expiresAt,
        user: req.userId // Обновляем значение user
      },
      { new: true }
    );

    if (!updatedSidereklama) {
      return res.status(404).json({ message: 'Баннер не найден' });
    }

    res.json(updatedSidereklama);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить баннер",
    });
  }
};
