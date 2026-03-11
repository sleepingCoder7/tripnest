import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("wishlist")) || [],
};

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const exists = state.items.find(
                (item) => item.id === action.payload.id,
            );
            if (!exists) {
                state.items.push(action.payload);
                localStorage.setItem("wishlist", JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id,
            );
            localStorage.setItem("wishlist", JSON.stringify(state.items));
        },
        setWishlist: (state, action) => {
            const newItems = Array.isArray(action.payload)
                ? action.payload
                : [];
            state.items = newItems;
            localStorage.setItem("wishlist", JSON.stringify(newItems));
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToWishlist, removeFromWishlist, setWishlist } =
    wishlistSlice.actions;

export default wishlistSlice.reducer;
