import ImportantreklamaModel from "../models/Importantreklama.js";

// Получение последних тегов
export const getLastTags = async (req, res) => {
  try {
    const currentDate = new Date(); // Текущая дата
    const importantreklamas = await ImportantreklamaModel.find({
      expiresAt: { $gt: currentDate } // Проверяем, что дата истечения позже текущей даты
    }).limit(5).exec();

    const tags = importantreklamas
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
    const importantreklamas = await ImportantreklamaModel.find({ expiresAt: { $gt: new Date() } });

    res.json(importantreklamas);
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
    const importantreklamaId = req.params.id;

    ImportantreklamaModel.findOneAndUpdate(
      {
        _id: importantreklamaId,
        expiresAt: { $gt: new Date() }, // Убедимся, что баннер еще не истек
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((importantreklama) => {
      if (!importantreklama) {
        return res.status(404).json({
          message: "Баннер не найден или истек",
        });
      }

      res.json(importantreklama);
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
    const importantreklamaId = req.params.id;

    ImportantreklamaModel.findOneAndDelete({
      _id: importantreklamaId,
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

    const doc = new ImportantreklamaModel({
      imageUrl,
      href,
      expiresAt,
      user: req.userId // Используем user ID из токена
    });

    const importantreklama = await doc.save();

    res.json(importantreklama);
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
    const importantreklamaId = req.params.id;
    const { imageUrl, href, duration } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + duration * 24 * 60 * 60 * 1000); // Установить истечение через указанное количество дней

    const updatedImportantreklama = await ImportantreklamaModel.findByIdAndUpdate(
      importantreklamaId,
      {
        imageUrl,
        href,
        expiresAt,
        user: req.userId // Обновляем значение user
      },
      { new: true }
    );

    if (!updatedImportantreklama) {
      return res.status(404).json({ message: 'Баннер не найден' });
    }

    res.json(updatedImportantreklama);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить баннер",
    });
  }
};
