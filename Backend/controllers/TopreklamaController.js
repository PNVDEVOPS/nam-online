import TopreklamaModel from "../models/Topreklama.js";

// Получение всех баннеров
export const getAllTopreklamas = async (req, res) => {
  try {
    const topreklamas = await TopreklamaModel.find({ expiresAt: { $gt: new Date() } });

    res.json(topreklamas);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить топ-рекламы",
    });
  }
};

// Получение одного баннера
export const getTopreklamaById = (req, res) => {
  try {
    const topreklamaId = req.params.id;

    TopreklamaModel.findOneAndUpdate(
      {
        _id: topreklamaId,
        expiresAt: { $gt: new Date() }, // Убедимся, что баннер еще не истек
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((topreklama) => {
      if (!topreklama) {
        return res.status(404).json({
          message: "Баннер не найден или истек",
        });
      }

      res.json(topreklama);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить топ-рекламу",
    });
  }
};

// Удаление баннера
export const removeTopreklama = async (req, res) => {
  try {
    const topreklamaId = req.params.id;

    TopreklamaModel.findOneAndDelete({
      _id: topreklamaId,
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
export const createTopreklama = async (req, res) => {
  try {
    const { imageUrl, href, duration } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + duration * 24 * 60 * 60 * 1000); // Установить истечение через указанное количество дней

    const doc = new TopreklamaModel({
      imageUrl,
      href,
      expiresAt,
      user: req.userId // Используем user ID из токена
    });

    const topreklama = await doc.save();

    res.json(topreklama);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать баннер",
    });
  }
};

// Обновление баннера
export const updateTopreklama = async (req, res) => {
  try {
    const topreklamaId = req.params.id;
    const { imageUrl, href, duration } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + duration * 24 * 60 * 60 * 1000); // Установить истечение через указанное количество дней

    const updatedTopreklama = await TopreklamaModel.findByIdAndUpdate(
      topreklamaId,
      {
        imageUrl,
        href,
        expiresAt,
        user: req.userId // Обновляем значение user
      },
      { new: true }
    );

    if (!updatedTopreklama) {
      return res.status(404).json({ message: 'Баннер не найден' });
    }

    res.json(updatedTopreklama);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить баннер",
    });
  }
};
