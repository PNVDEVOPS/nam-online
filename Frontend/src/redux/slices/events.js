import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const { data } = await axios.get('/events');
    return data;
})

export const fetchAfTags = createAsyncThunk('events/fetchAfTags', async () => {
    const { data } = await axios.get('/aftags');
    return data;
})

export const fetchRemoveEvent = createAsyncThunk('events/fetchRemoveEvent', async (id) => {
    axios.delete(`/events/${id}`);
})

const initialState = {
    events: {
        items: [],
        status: 'loading',
    },
    aftags: {
        items: [],
        status: 'loading',
    },
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: {
        //Posts
        [fetchEvents.pending]: (state) => {
            state.events.items = [];
            state.events.status = 'loading';
        },

        [fetchEvents.fulfilled]: (state, action) => {
            state.events.items = action.payload
            state.events.status = 'loaded';
        },

        [fetchEvents.rejected]: (state) => {
            state.events.items = [];
            state.events.status = 'error';
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
        [fetchRemoveEvent.pending]: (state, action) => {
            state.events.items = state.events.items.filter((obj) => obj._id !== action.meta.arg)
        },     
    }
})

export const eventsReducer = eventsSlice.reducer