import CafeModel from "../models/Cafe.js";

export const getAllCafes = async (req, res) => {
  try {
    const cafes = await CafeModel.find()
      .populate({ path: "user", select: ["name", "avatar"] })
      .populate('cafecategories', 'name') // Убедимся, что мы получаем поле name из категорий
      .exec();

    res.json(cafes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить список кафе",
    });
  }
};

export const getCafeById = (req, res) => {
  try {
    const cafeId = req.params.id;

    CafeModel.findOneAndUpdate(
      {
        _id: cafeId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
    .populate('cafecategories', 'name') // Убедимся, что мы получаем поле name из категорий
    .then((cafe) => {
      if (!cafe) {
        return res.status(404).json({
          message: "Кафе не найдено",
        });
      }

      res.json(cafe);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить информацию о кафе",
    });
  }
};

export const removeCafe = async (req, res) => {
  try {
    const cafeId = req.params.id;

    CafeModel.findOneAndDelete({
      _id: cafeId,
    }).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Кафе не найдено",
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить кафе",
    });
  }
};

export const createCafe = async (req, res) => {
  const { name, cafecategories, time, contact, avatar, menu } = req.body;
  const newCafe = new CafeModel({
    user: req.userId, // Используем user ID из токена
    name,
    cafecategories,
    time,
    contact,
    avatar,
    menu
  });

  try {
    const savedCafe = await newCafe.save();
    res.status(201).json(savedCafe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCafe = async (req, res) => {
  const { name, cafecategories, time, contact, avatar, menu } = req.body;
  const cafeId = req.params.id;

  try {
    const updatedCafe = await CafeModel.findByIdAndUpdate(cafeId, {
      user: req.userId, // Обновляем значение user
      name,
      cafecategories,
      time,
      contact,
      avatar,
      menu
    }, { new: true }).populate('cafecategories', 'name'); // Убедимся, что мы получаем поле name из категорий

    if (!updatedCafe) {
      return res.status(404).json({ message: 'Кафе не найдено' });
    }

    res.json(updatedCafe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
