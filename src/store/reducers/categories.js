// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    list: [],
    mainCategories: [],
    selected: {
        title: "All Categories"
    },
    modalOpen: true 
};

// ==============================|| SLICE - CATEGORIES ||============================== //

const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {

        populateMainCategories(state, action) {
            if (typeof action.payload === 'object') {
                state.list = action.payload;
                state.mainCategories = action.payload.filter(c => c.parent === "none")
            }
        },

        selectCategory(state, action) {
            state.selected = action.payload
        },

        toggleModal(state, action) {
            state.modalOpen = !state.modalOpen
        }

    }
});

export default categories.reducer;

export const { populateMainCategories, selectCategory, toggleModal } = categories.actions;
