import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
    const { data } = await axios.get('/ads');
    return data;
})

export const fetchTags = createAsyncThunk('ads/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
})

export const fetchRemoveAds = createAsyncThunk('ads/fetchRemoveAds', async (id) => {
    axios.delete(`/ads/${id}`);
})

const initialState = {
    ads: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {},
    extraReducers: {
        //Posts
        [fetchAds.pending]: (state) => {
            state.ads.items = [];
            state.ads.status = 'loading';
        },

        [fetchAds.fulfilled]: (state, action) => {
            state.ads.items = action.payload
            state.ads.status = 'loaded';
        },

        [fetchAds.rejected]: (state) => {
            state.ads.items = [];
            state.ads.status = 'error';
        },
        //tags
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },

        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded';
        },

        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        //Delete 
        [fetchRemoveAds.pending]: (state, action) => {
            state.ads.items = state.ads.items.filter((obj) => obj._id !== action.meta.arg)
        },     
    }
})

export const adsReducer = adsSlice.reducer