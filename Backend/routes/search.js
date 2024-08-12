import express from 'express';
import { searchController } from '../controllers/SearchController.js';

const router = express.Router();

// Маршрут для поиска
router.get('/', searchController.search);

export default router;
