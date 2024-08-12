import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const { data } = await axios.get('/categories');
    return data;
  }
);

export const fetchRemoveCategory = createAsyncThunk(
  'categories/fetchRemoveCategory',
  async (id) => {
    await axios.delete(`/categories/${id}`);
    return id; // Возвращаем id, чтобы можно было обработать удаление в редьюсере
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      })
      .addCase(fetchRemoveCategory.fulfilled, (state, action) => {
        // Удаляем категорию с указанным id из state.items
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const selectCategories = (state) => state.categories;

export const categoriesReducer = categoriesSlice.reducer;
