import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchImportantreklamas = createAsyncThunk(
  "importantreklamas/fetchImportantreklamas",
  async () => {
    const { data } = await axios.get("/importantreklamas");
    return data;
  }
);

export const fetchRemoveImportantreklama = createAsyncThunk(
  "importantreklamas/fetchRemoveImportantreklama",
  async (id) => {
    axios.delete(`/importantreklamas/${id}`);
  }
);

export const fetchImportantreklamaById = createAsyncThunk(
  "importantreklamas/fetchImportantreklamaById",
  async (id) => {
    const { data } = await axios.get(`/importantreklamas/${id}`);
    return data;
  }
);

const initialState = {
  importantreklamas: {
    items: [],
    status: "loading",
  },
  selectedImportantreklama: {
    item: null,
    status: "loading",
  },
};

const importantreklamasSlice = createSlice({
  name: "importantreklamas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImportantreklamas.pending, (state) => {
        state.importantreklamas.items = [];
        state.importantreklamas.status = "loading";
      })
      .addCase(fetchImportantreklamas.fulfilled, (state, action) => {
        state.importantreklamas.items = action.payload;
        state.importantreklamas.status = "loaded";
      })
      .addCase(fetchImportantreklamas.rejected, (state) => {
        state.importantreklamas.items = [];
        state.importantreklamas.status = "error";
      })
      .addCase(fetchRemoveImportantreklama.pending, (state, action) => {
        state.importantreklamas.items = state.importantreklamas.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      .addCase(fetchImportantreklamaById.pending, (state) => {
        state.selectedImportantreklama.item = null;
        state.selectedImportantreklama.status = "loading";
      })
      .addCase(fetchImportantreklamaById.fulfilled, (state, action) => {
        state.selectedImportantreklama.item = action.payload;
        state.selectedImportantreklama.status = "loaded";
      })
      .addCase(fetchImportantreklamaById.rejected, (state) => {
        state.selectedImportantreklama.item = null;
        state.selectedImportantreklama.status = "error";
      });
  },
});

export const importantreklamasReducer = importantreklamasSlice.reducer;
