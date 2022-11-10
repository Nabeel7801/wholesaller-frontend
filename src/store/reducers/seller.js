// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    status: null
};

// ==============================|| SLICE - SELLER ||============================== //

const seller = createSlice({
    name: 'seller',
    initialState,
    reducers: {

        
        createSeller(state, action) {
            state.status = true;
        },

    }
});

export default seller.reducer;

export const { populateCategories } = seller.actions;
