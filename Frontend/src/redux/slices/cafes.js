import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Создание кафе
export const fetchCreateCafe = createAsyncThunk('cafes/fetchCreateCafe', async (cafeData) => {
    const { data } = await axios.post('/cafes', cafeData);
    return data;
});

// Обновление кафе
export const fetchUpdateCafe = createAsyncThunk('cafes/fetchUpdateCafe', async ({ id, cafeData }) => {
    const { data } = await axios.patch(`/cafes/${id}`, cafeData);
    return data;
});

// Получение списка кафе
export const fetchCafes = createAsyncThunk('cafes/fetchCafes', async () => {
    const { data } = await axios.get('/cafes');
    return data;
});

// Удаление кафе
export const fetchRemoveCafe = createAsyncThunk('cafes/fetchRemoveCafe', async (id) => {
    await axios.delete(`/cafes/${id}`);
    return id; // Возвращаем id для обработки в extraReducers
});

const initialState = {
    cafes: {
        items: [],
        status: 'loading',
    },
};

const cafesSlice = createSlice({
    name: 'cafes',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCafes.pending]: (state) => {
            state.cafes.items = [];
            state.cafes.status = 'loading';
        },
        [fetchCafes.fulfilled]: (state, action) => {
            state.cafes.items = action.payload;
            state.cafes.status = 'loaded';
        },
        [fetchCafes.rejected]: (state) => {
            state.cafes.items = [];
            state.cafes.status = 'error';
        },
        [fetchRemoveCafe.pending]: (state) => {
            state.cafes.status = 'loading';
        },
        [fetchRemoveCafe.fulfilled]: (state, action) => {
            state.cafes.items = state.cafes.items.filter((cafe) => cafe._id !== action.payload);
            state.cafes.status = 'loaded';
        },
        [fetchRemoveCafe.rejected]: (state) => {
            state.cafes.status = 'error';
        },
        [fetchCreateCafe.fulfilled]: (state, action) => {
            state.cafes.items.push(action.payload); // Добавляем новое кафе в массив
            state.cafes.status = 'loaded';
        },
        [fetchUpdateCafe.fulfilled]: (state, action) => {
            const updatedCafeIndex = state.cafes.items.findIndex(cafe => cafe._id === action.payload._id);
            if (updatedCafeIndex !== -1) {
                state.cafes.items[updatedCafeIndex] = action.payload; // Обновляем кафе в массиве
            }
            state.cafes.status = 'loaded';
        },
    },
});

export const cafesReducer = cafesSlice.reducer;
