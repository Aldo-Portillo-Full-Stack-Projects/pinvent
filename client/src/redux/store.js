import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../redux/features/authSlice'
import productReducer from '../redux/features/productSlice'
import filterReducer from '../redux/features/filterSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,
    }
})