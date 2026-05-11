import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrderToHistory(state, action) {
      state.history.unshift({
        ...action.payload,
        date: new Date().toISOString(),
        status: 'Processing'
      });
    }
  }
});

export const { addOrderToHistory } = orderSlice.actions;
export default orderSlice.reducer;
