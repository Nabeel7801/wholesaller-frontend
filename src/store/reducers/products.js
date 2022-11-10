// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    list: [],
    selected: null
};

// ==============================|| SLICE - PRODUCTS ||============================== //

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {

        populateProducts(state, action) {
            if (typeof action.payload === 'object') {
                state.list = action.payload;
            }
        },

        selectProduct(state, action) {
            state.selected = action.payload
        },

    }
});

export default products.reducer;

export const { populateProducts, selectProduct } = products.actions;
