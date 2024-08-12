import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchMenuItems = createAsyncThunk('menuItems/fetchMenuItems', async () => {
    const { data } = await axios.get('/menuItems');
    return data;
});

export const fetchRemoveMenuItem = createAsyncThunk('menuItems/fetchRemoveMenuItem', async (id) => {
    await axios.delete(`/menuItems/${id}`);
    return id; // Возвращаем id для обработки в extraReducers
});

const initialState = {
    menuItems: {
        items: [],
        status: 'loading',
    },
};

const menuItemsSlice = createSlice({
    name: 'menuItems',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMenuItems.pending]: (state) => {
            state.menuItems.items = [];
            state.menuItems.status = 'loading';
        },
        [fetchMenuItems.fulfilled]: (state, action) => {
            state.menuItems.items = action.payload;
            state.menuItems.status = 'loaded';
        },
        [fetchMenuItems.rejected]: (state) => {
            state.menuItems.items = [];
            state.menuItems.status = 'error';
        },
        [fetchRemoveMenuItem.fulfilled]: (state, action) => {
            // Удаляем элемент из массива по его идентификатору
            state.menuItems.items = state.menuItems.items.filter((item) => item._id !== action.meta.arg);
            state.menuItems.status = 'loaded'; // Устанавливаем статус загрузки как "loaded"
            
        },
    },
});

export const menuItemsReducer = menuItemsSlice.reducer;
