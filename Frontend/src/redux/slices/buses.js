import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchBuses = createAsyncThunk('buses/fetchBuses', async () => {
  const { data } = await axios.get('/buses');
  return data;
});

export const fetchRemoveBus = createAsyncThunk('buses/fetchRemoveBus', async (id) => {
  await axios.delete(`/buses/${id}`);
  return id;
});

const initialState = {
  items: [],
  status: 'loading',
};

const busesSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBuses.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchBuses.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'loaded';
    },
    [fetchBuses.rejected]: (state) => {
      state.status = 'error';
    },
    [fetchRemoveBus.fulfilled]: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload);
    },
  },
});

export const busesReducer = busesSlice.reducer;
