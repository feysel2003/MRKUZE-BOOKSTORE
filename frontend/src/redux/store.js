import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../redux/features/cart/cartSlice"
import booksApi from './features/books/booksApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),

})