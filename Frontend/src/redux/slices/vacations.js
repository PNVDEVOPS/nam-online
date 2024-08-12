import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchVacations = createAsyncThunk('vacations/fetchVacations', async () => {
    const { data } = await axios.get('/vacations');
    return data;
})

export const fetchTags = createAsyncThunk('vacations/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
})

export const fetchRemoveVacations = createAsyncThunk('vacations/fetchRemoveVacations', async (id) => {
    axios.delete(`/vacations/${id}`);
})

const initialState = {
    vacations: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const vacationsSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {},
    extraReducers: {
        //Posts
        [fetchVacations.pending]: (state) => {
            state.vacations.items = [];
            state.vacations.status = 'loading';
        },

        [fetchVacations.fulfilled]: (state, action) => {
            state.vacations.items = action.payload
            state.vacations.status = 'loaded';
        },

        [fetchVacations.rejected]: (state) => {
            state.vacations.items = [];
            state.vacations.status = 'error';
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
        [fetchRemoveVacations.pending]: (state, action) => {
            state.vacations.items = state.vacations.items.filter((obj) => obj._id !== action.meta.arg)
        },     
    }
})

export const vacationsReducer = vacationsSlice.reducer