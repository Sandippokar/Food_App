import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart:[]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      // debugger
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeToCart: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
    emptyCart: (state, action) => {
      if(action.payload === true){
        state.cart = [];
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  removeToCart,
  emptyCart,
} = cartSlice.actions;