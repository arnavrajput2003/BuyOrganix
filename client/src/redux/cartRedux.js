import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingIndex = state.products.findIndex(
        (p) => (p._id && p._id === action.payload._id) || (p.id && p.id === action.payload.id)
      );

      if (existingIndex >= 0) {
        const stock = state.products[existingIndex].stock || 10;
        const currentQty = state.products[existingIndex].quantity;

        if (action.payload.quantity === -1 && currentQty === 1) {
          // Remove product from cart
          state.total -= action.payload.price;
          state.products.splice(existingIndex, 1);
          state.quantity = state.products.length;
        } else if (action.payload.quantity === 1 && currentQty >= stock) {
          // Out of stock, do nothing
          return;
        } else {
          // Update quantity
          state.products[existingIndex].quantity += action.payload.quantity;
          state.total += action.payload.price * action.payload.quantity;
          state.quantity = state.products.length;
        }
      } else {
        // New product, add to cart
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    delCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, delCart } = cartSlice.actions;
export default cartSlice.reducer;