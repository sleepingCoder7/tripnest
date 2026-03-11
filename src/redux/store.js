import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './slices/wishlistSlice'
import hotelReducer from './slices/hotelSlice'

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    hotels: hotelReducer,
  },
})