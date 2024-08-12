import Post from '../models/Post.js';
import Ad from '../models/Ad.js';
import Afisha from '../models/Afisha.js';
import Event from '../models/Event.js';

export const searchController = {
  search: async (req, res) => {
    const { query, collection } = req.query;
    if (!query || !collection) {
      return res.status(400).json({ message: 'Query and collection are required' });
    }

    let results = [];

    try {
      switch (collection) {
        case 'posts':
          results = await Post.find({
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { content: { $regex: query, $options: 'i' } }
            ]
          });
          break;
        case 'ads':
          results = await Ad.find({
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
            ]
          });
          break;
        case 'afishas':
          results = await Afisha.find({
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
            ]
          });
          break;
        case 'events':
          results = await Event.find({
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
            ]
          });
          break;
        default:
          return res.status(400).json({ message: 'Invalid collection' });
      }

      res.json(results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
