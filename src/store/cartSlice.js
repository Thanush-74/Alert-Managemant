import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

increaseQty: (state, action) => {
  const item = state.items.find(i => i.id == action.payload);
  if (item) item.qty += 1;
},

decreaseQty: (state, action) => {
  state.items = state.items
    .map(item =>
      item.id == action.payload
        ? { ...item, qty: item.qty - 1 }
        : item
    )
    .filter(item => item.qty > 0);
},

removeItem: (state, action) => {
  state.items = state.items.filter(i => i.id != action.payload);
},
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;