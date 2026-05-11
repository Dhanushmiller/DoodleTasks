import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isWishlistOpen: false,
  currencies: {
    USD: { code: 'USD', symbol: '$', rate: 1 },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
    GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
    INR: { code: 'INR', symbol: '₹', rate: 83.00 },
  },
  selectedCurrency: 'USD',
  toast: {
    message: '',
    type: 'success', // success, error, info
    visible: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleWishlistDrawer(state) {
      state.isWishlistOpen = !state.isWishlistOpen;
    },
    setCurrency(state, action) {
      state.selectedCurrency = action.payload;
    },
    showToast(state, action) {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || 'success',
        visible: true,
      };
    },
    hideToast(state) {
      state.toast.visible = false;
    }
  }
});

export const { toggleWishlistDrawer, setCurrency, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
