export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('vibe_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart,
      wishlist: state.wishlist,
      orders: state.orders,
      ui: {
        ...state.ui,
        isWishlistOpen: false, // Don't persist open drawer
        toast: { message: '', type: 'success', visible: false } // Don't persist visible toast
      }
    });
    localStorage.setItem('vibe_state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};
