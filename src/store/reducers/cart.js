// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    items: []
};

// ==============================|| SLICE - CART ||============================== //

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setCart(state, action) {
            state.items = action.payload
        },

        addItem(state, action) {
            const { productDetails, quantity } = action.payload;
            const exist = state.items.filter(c => c.product_id === productDetails.id)[0];
            if (exist) {
                state.items = state.items.map(c => c.product_id === productDetails.id ? {...c, quantity: (c.quantity+quantity)} : c)

            }else {
                const newObj = {
                    product_id: productDetails.id,
                    buy_price: productDetails.price,
                    quantity: quantity
                }
                state.items = [...state.items, newObj]
            }
        },

        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },

        clearCart(state, action) {
            state.items = []
        }
    }
});

export default cart.reducer;

export const { setCart, addItem, removeItem, clearCart } = cart.actions;
