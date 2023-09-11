import { configureStore } from "@reduxjs/toolkit";
import productReducer from './features/product/productSlice'

export const store = configureStore ({
    reducer:productReducer  // added or changes
})