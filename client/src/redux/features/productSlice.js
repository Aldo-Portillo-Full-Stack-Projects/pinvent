import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import productService from '../../services/productService';

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Create Product

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData)
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString();
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get all products

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts()
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString();
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)



const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action){
        console.log("store value");
    }
  },
  extraReducers: (builder) => {
    builder 
          //create product cases
          .addCase(createProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            console.log(action.payload);
            state.products.push(action.payload)
            toast.success("Product added successfully")
          })
          .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
          })
          //Get Products cases
          .addCase(getProducts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.products = action.payload
          })
          .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
          })
          
  }
});

export const {CALC_STORE_VALUE} = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading

export default productSlice.reducer