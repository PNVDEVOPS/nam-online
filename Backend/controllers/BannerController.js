import BannerModel from "../models/Banner.js";

export const getLastTags = async (req, res) => {
  try {
    const banners = await BannerModel.find().limit(5).exec();

    const tags = banners
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

export const getAll = async (req, res) => {
  try {
    const banners = await BannerModel.find()
      .populate({ path: "user", select: ["name", "avatar"] })
      .exec();

    res.json(banners);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const getOne = (req, res) => {
  try {
    const bannerId = req.params.id;

    BannerModel.findOneAndUpdate(
      {
        _id: bannerId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((banner) => {
      if (!banner) {
        return res.status(404).json({
          message: "баннер не найден",
        });
      }

      res.json(banner);
    }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "не удалось получить статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const bannerId = req.params.id;

    BannerModel.findOneAndDelete({
      _id: bannerId,
    }).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Баннер не найдена",
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const create = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: 'Пользователь не аутентифицирован' });
    }

    const doc = new BannerModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const banner = await doc.save();

    res.json(banner);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать banner",
    });
  }
};

export const update = async (req, res) => {
  try {
    const bannerId = req.params.id;

    await BannerModel.updateOne(
      {
        _id: bannerId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,

      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить баннер",
    });
  }
};