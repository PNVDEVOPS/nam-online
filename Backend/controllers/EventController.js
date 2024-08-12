import EventModel from "../models/Event.js";

export const getLastTags = async (req, res) => {
  try {
    const events = await EventModel.find().limit(5).exec();

    const aftags = events
      .map((obj) => obj.aftags)
      .flat()
      .slice(0, 5);

    res.json(aftags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate({ path: "user", select: ["name", "avatar"] })
      .exec();

    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить афишу",
    });
  }
};

export const getOne = (req, res) => {
  try {
    const eventId = req.params.id;

    EventModel.findOneAndUpdate(
      {
        _id: eventId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((event) => {
      if (!event) {
        return res.status(404).json({
          message: "афиша не найдена",
        });
      }

      res.json(event);
    }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      messgae: "не удалось получить афиша",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const eventId = req.params.id;
    const doc = await EventModel.findOneAndDelete({ _id: eventId }).exec();

    if (!doc) {
      return res.status(404).json({
        message: 'Событие не найдено',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить событие',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new EventModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      phone: req.body.phone,
      secondphone: req.body.secondphone,
      date: req.body.date
    });

    const event = await doc.save();

    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать афишу",
    });
  }
};

export const update = async (req, res) => {
  try {
    const eventId = req.params.id;

    await EventModel.updateOne(
      {
        _id: eventId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        phone: req.body.phone,
        secondphone: req.body.secondphone,
        date: req.body.date
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить афишу",
    });
  }
};
