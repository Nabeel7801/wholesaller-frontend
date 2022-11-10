// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    document: null,
    status: null
};

// ==============================|| SLICE - DOCUMENT ||============================== //

const document = createSlice({
    name: 'document',
    initialState,
    reducers: {

        
        uploadDocument(state, action) {
            state.document = action.payload;
        },

    }
});

export default document.reducer;

export const { populateCategories } = document.actions;
