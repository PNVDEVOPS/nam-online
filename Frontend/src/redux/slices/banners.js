import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    const { data } = await axios.get("/banners");
    return data;
  }
);

export const fetchRemoveBanner = createAsyncThunk(
  "banners/fetchRemoveBanner",
  async (id) => {
    axios.delete(`/banners/${id}`);
  }
);

export const fetchTags = createAsyncThunk('banners/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
})

const initialState = {
  banners: {
    items: [],
    status: "loading",
  },
};

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: {
    //Posts
    [fetchBanners.pending]: (state) => {
      state.banners.items = [];
      state.banners.status = "loading";
    },

    [fetchBanners.fulfilled]: (state, action) => {
      state.banners.items = action.payload;
      state.banners.status = "loaded";
    },

    [fetchBanners.rejected]: (state) => {
      state.banners.items = [];
      state.banners.status = "error";
    },
    //tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },

    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },

    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //Delete
    [fetchBanners.pending]: (state, action) => {
      state.banners.items = state.banners.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const bannersReducer = bannersSlice.reducer;
