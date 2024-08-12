import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchSidereklamas = createAsyncThunk(
  "sidereklamas/fetchSidereklamas",
  async () => {
    const { data } = await axios.get("/sidereklamas");
    return data;
  }
);

export const fetchRemoveSidereklama = createAsyncThunk(
  "sidereklamas/fetchRemoveSidereklama",
  async (id) => {
    axios.delete(`/sidereklamas/${id}`);
  }
);

export const fetchSidereklamaById = createAsyncThunk(
  "sidereklamas/fetchSidereklamaById",
  async (id) => {
    const { data } = await axios.get(`/sidereklamas/${id}`);
    return data;
  }
);

const initialState = {
  sidereklamas: {
    items: [],
    status: "loading",
  },
  selectedSidereklama: {
    item: null,
    status: "loading",
  },
};

const sidereklamasSlice = createSlice({
  name: "sidereklamas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidereklamas.pending, (state) => {
        state.sidereklamas.items = [];
        state.sidereklamas.status = "loading";
      })
      .addCase(fetchSidereklamas.fulfilled, (state, action) => {
        state.sidereklamas.items = action.payload;
        state.sidereklamas.status = "loaded";
      })
      .addCase(fetchSidereklamas.rejected, (state) => {
        state.sidereklamas.items = [];
        state.sidereklamas.status = "error";
      })
      .addCase(fetchRemoveSidereklama.pending, (state, action) => {
        state.sidereklamas.items = state.sidereklamas.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      .addCase(fetchSidereklamaById.pending, (state) => {
        state.selectedSidereklama.item = null;
        state.selectedSidereklama.status = "loading";
      })
      .addCase(fetchSidereklamaById.fulfilled, (state, action) => {
        state.selectedSidereklama.item = action.payload;
        state.selectedSidereklama.status = "loaded";
      })
      .addCase(fetchSidereklamaById.rejected, (state) => {
        state.selectedSidereklama.item = null;
        state.selectedSidereklama.status = "error";
      });
  },
});

export const sidereklamasReducer = sidereklamasSlice.reducer;
