import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchMenuCategories = createAsyncThunk(
  'menucategories/fetchMenuCategories',
  async () => {
    const { data } = await axios.get('/menucategories');
    return data;
  }
);

export const fetchRemoveMenuCategory = createAsyncThunk(
  'menucategories/fetchRemoveMenuCategory',
  async (id) => {
    await axios.delete(`/menucategories/${id}`);
    return id; // Return id so that you can handle removal in the reducer
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

const menucategoriesSlice = createSlice({
  name: 'menucategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuCategories.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchMenuCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchMenuCategories.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      })
      .addCase(fetchRemoveMenuCategory.fulfilled, (state, action) => {
        // Remove the category with the provided id from state.items
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const selectMenuCategories = (state) => state.menucategories;

export const menucategoriesReducer = menucategoriesSlice.reducer;