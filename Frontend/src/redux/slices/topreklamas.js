import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTopreklamas = createAsyncThunk(
  "topreklamas/fetchTopreklamas",
  async () => {
    const { data } = await axios.get("/topreklamas");
    return data;
  }
);

export const fetchRemoveTopreklama = createAsyncThunk(
  "topreklamas/fetchRemoveTopreklama",
  async (id) => {
    axios.delete(`/topreklamas/${id}`);
  }
);

export const fetchTopreklamaById = createAsyncThunk(
  "topreklamas/fetchTopreklamaById",
  async (id) => {
    const { data } = await axios.get(`/topreklamas/${id}`);
    return data;
  }
);

const initialState = {
  topreklamas: {
    items: [],
    status: "loading",
  },
  selectedTopreklama: {
    item: null,
    status: "loading",
  },
};

const topreklamasSlice = createSlice({
  name: "topreklamas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopreklamas.pending, (state) => {
        state.topreklamas.items = [];
        state.topreklamas.status = "loading";
      })
      .addCase(fetchTopreklamas.fulfilled, (state, action) => {
        state.topreklamas.items = action.payload;
        state.topreklamas.status = "loaded";
      })
      .addCase(fetchTopreklamas.rejected, (state) => {
        state.topreklamas.items = [];
        state.topreklamas.status = "error";
      })
      .addCase(fetchRemoveTopreklama.pending, (state, action) => {
        state.topreklamas.items = state.topreklamas.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      .addCase(fetchTopreklamaById.pending, (state) => {
        state.selectedTopreklama.item = null;
        state.selectedTopreklama.status = "loading";
      })
      .addCase(fetchTopreklamaById.fulfilled, (state, action) => {
        state.selectedTopreklama.item = action.payload;
        state.selectedTopreklama.status = "loaded";
      })
      .addCase(fetchTopreklamaById.rejected, (state) => {
        state.selectedTopreklama.item = null;
        state.selectedTopreklama.status = "error";
      });
  },
});

export const topreklamasReducer = topreklamasSlice.reducer;
