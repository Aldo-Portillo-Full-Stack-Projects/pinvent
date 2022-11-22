import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../redux/features/authSlice'
import productReducer from '../redux/features/productSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
    }
})