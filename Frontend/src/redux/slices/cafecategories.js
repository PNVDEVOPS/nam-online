import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Асинхронный thunk для получения категорий кафе
export const fetchCafeCategories = createAsyncThunk(
  'cafecategories/fetchCafeCategories',
  async () => {
    const { data } = await axios.get('/cafecategories');
    return data;
  }
);

// Асинхронный thunk для удаления категории кафе
export const fetchRemoveCafeCategory = createAsyncThunk(
  'cafecategories/fetchRemoveCafeCategory',
  async (id) => {
    await axios.delete(`/cafecategories/${id}`);
    return id; // Возвращаем id для обработки удаления в редукторе
  }
);

// Начальное состояние среза
const initialState = {
  items: [],
  status: 'loading',
};

// Создание среза для управления категориями кафе
const cafecategoriesSlice = createSlice({
  name: 'cafecategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCafeCategories.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchCafeCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchCafeCategories.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      })
      .addCase(fetchRemoveCafeCategory.fulfilled, (state, action) => {
        // Удаляем категорию с заданным id из state.items
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

// Селектор для получения списка категорий кафе из состояния
export const selectCafeCategories = (state) => state.cafecategories;

// Экспорт редуктора
export const cafecategoriesReducer = cafecategoriesSlice.reducer;
