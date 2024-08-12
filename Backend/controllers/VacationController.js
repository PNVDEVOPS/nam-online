import VacationModel from "../models/Vacation.js";

// Получение последних тегов
export const getLastTags = async (req, res) => {
  try {
    const currentDate = new Date();
    const vacations = await VacationModel.find({ expiresAt: { $gt: currentDate } }).limit(5).exec();

    const tags = vacations
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
    const vacations = await VacationModel.find({ expiresAt: { $gt: new Date() } })
      .populate({ path: "user", select: ["name", "avatar"] })
      .populate('vacationcategory')
      .exec();

    res.json(vacations);
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
    const vacationId = req.params.id;

    VacationModel.findOneAndUpdate(
      {
        _id: vacationId,
        expiresAt: { $gt: new Date() },
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((vacation) => {
      if (!vacation) {
        return res.status(404).json({
          message: "Объявление не найдено или истекло",
        });
      }

      res.json(vacation);
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
    const vacationId = req.params.id;

    VacationModel.findOneAndDelete({
      _id: vacationId,
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
    const { title, text, imageUrls, phone, price, vacationcategory, mail, daysToExpire } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000); 

    // Проверяем, является ли дата корректной
    if (isNaN(expiresAt.valueOf())) {
      throw new Error("Некорректное количество дней до истечения");
    }

    const doc = new VacationModel({
      title,
      text,
      imageUrls,
      user: req.userId,
      phone,
      price,
      vacationcategory,
      expiresAt,
      mail,
    });

    const vacation = await doc.save();

    res.json(vacation);
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
    const vacationId = req.params.id;
    const { title, text, imageUrls, phone, price, vacationcategory, daysToExpire, mail, } = req.body;
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000); 

    // Проверяем, является ли дата корректной
    if (isNaN(expiresAt.valueOf())) {
      throw new Error("Некорректное количество дней до истечения");
    }

    await VacationModel.updateOne(
      {
        _id: vacationId,
      },
      {
        title,
        text,
        imageUrls,
        user: req.userId,
        phone,
        price,
        vacationcategory,
        expiresAt,
        mail,
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
