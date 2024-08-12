import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchAfishas = createAsyncThunk('afishas/fetchAfishas', async () => {
    const { data } = await axios.get('/afishas');
    return data;
})

export const fetchAfTags = createAsyncThunk('afishas/fetchAfTags', async () => {
    const { data } = await axios.get('/aftags');
    return data;
})

export const fetchRemoveAfisha = createAsyncThunk('afishas/fetchRemoveAfisha', async (id) => {
    axios.delete(`/afishas/${id}`);
})

const initialState = {
    afishas: {
        items: [],
        status: 'loading',
    },
    aftags: {
        items: [],
        status: 'loading',
    },
};

const afishasSlice = createSlice({
    name: 'afishas',
    initialState,
    reducers: {},
    extraReducers: {
        //Posts
        [fetchAfishas.pending]: (state) => {
            state.afishas.items = [];
            state.afishas.status = 'loading';
        },

        [fetchAfishas.fulfilled]: (state, action) => {
            state.afishas.items = action.payload
            state.afishas.status = 'loaded';
        },

        [fetchAfishas.rejected]: (state) => {
            state.afishas.items = [];
            state.afishas.status = 'error';
        },
        //tags
        [fetchAfTags.pending]: (state) => {
            state.aftags.items = [];
            state.aftags.status = 'loading';
        },

        [fetchAfTags.fulfilled]: (state, action) => {
            state.aftags.items = action.payload
            state.aftags.status = 'loaded';
        },

        [fetchAfTags.rejected]: (state) => {
            state.aftags.items = [];
            state.aftags.status = 'error';
        },
        //Delete 
        [fetchRemoveAfisha.pending]: (state, action) => {
            state.afishas.items = state.afishas.items.filter((obj) => obj._id !== action.meta.arg)
        },     
    }
})

export const afishasReducer = afishasSlice.reducer