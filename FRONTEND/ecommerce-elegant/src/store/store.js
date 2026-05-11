import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import wishlistReducer from './wishlistSlice';
import uiReducer from './uiSlice';
import orderReducer from './orderSlice';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    orders: orderReducer,
  },
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});

