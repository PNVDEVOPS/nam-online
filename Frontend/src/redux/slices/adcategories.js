import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAdCategories = createAsyncThunk(
  'adcategories/fetchAdCategories',
  async () => {
    const { data } = await axios.get('/api/adcategories');
    return data;
  }
);

export const fetchRemoveAdCategory = createAsyncThunk(
  'adcategories/fetchRemoveAdCategory',
  async (id) => {
    await axios.delete(`/adcategories/${id}`);
    return id; // Return id so that you can handle removal in the reducer
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

const adcategoriesSlice = createSlice({
  name: 'adcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdCategories.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchAdCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchAdCategories.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      })
      .addCase(fetchRemoveAdCategory.fulfilled, (state, action) => {
        // Remove the category with the provided id from state.items
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const selectAdCategories = (state) => state.adcategories;

export const adcategoriesReducer = adcategoriesSlice.reducer;