import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchVacationCategories = createAsyncThunk(
  'vacationcategories/fetchVacationCategories',
  async () => {
    const { data } = await axios.get('/vacationcategories');
    return data;
  }
);

export const fetchRemoveVacationCategory = createAsyncThunk(
  'vacationcategories/fetchRemoveVacationCategory',
  async (id) => {
    await axios.delete(`/vacationcategories/${id}`);
    return id; // Return id so that you can handle removal in the reducer
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

const vacationcategoriesSlice = createSlice({
  name: 'vacationcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacationCategories.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchVacationCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchVacationCategories.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      })
      .addCase(fetchRemoveVacationCategory.fulfilled, (state, action) => {
        // Remove the category with the provided id from state.items
        state.items = state.items.filter((item) => item.id !== action.payloadion);
      });
  },
});

export const selectVacationCategories = (state) => state.vacationcategories;

export const vacationcategoriesReducer = vacationcategoriesSlice.reducer;