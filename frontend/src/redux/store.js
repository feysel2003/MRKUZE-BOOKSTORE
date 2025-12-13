import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../redux/features/cart/cartSlice"
import booksApi from './features/books/booksApi'
import orderApi from './features/orders/orderApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, orderApi.middleware),

})