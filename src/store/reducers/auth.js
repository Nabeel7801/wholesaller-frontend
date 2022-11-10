// types
import { createSlice } from '@reduxjs/toolkit'

// initial state
const initialState = {
    user: null, 
    token: null
};

// ==============================|| SLICE - AUTH ||============================== //

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: ( state, { payload: { user, token } } ) => {
            state.user = user
            state.token = token
        },
        setDocument: (state, action) => {
            if (state.user) {
                state.user.document = action.payload;
            }
        },
        logout: ( state, action ) => {
            // Left Blank intentionally
        },
    }
})

export default auth.reducer

export const { setCredentials, logout, setDocument } = auth.actions

export const selectCurrentUser = (state) => state.auth.user
export const selectConfig = (state) => ({headers: {authorization: `Bearer ${state.auth.token}`}})
