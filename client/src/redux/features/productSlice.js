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
    totalStoreValue: 0,
    outOfStock: 0,
    category: []
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

//Delete product

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id)
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString();
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get a product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id)
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString();
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({id, formData}, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData)
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
        const products = action.payload
        const arr = []
        products.map((item) => { //Create new array that returns new value for each product
          const {price, quantity} = item
          const productValue = price * quantity
          return arr.push(productValue)
        })
        const totalValue = arr.reduce((a,b) => {
          return a+b
        },0)
        state.totalStoreValue = totalValue
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload
      const outOfStockArr = [];
      products.map((item) => {
        const {quantity} = item;

        return outOfStockArr.push(quantity)
      })

      let count = 0
      
      outOfStockArr.forEach((num) => {
        if(num === 0 || num === '0') {
          count++
        }
      })

      state.outOfStock = count
    },

    CALC_CATEGORY(state, action) {
      const products = action.payload
      const categoryArr = [];
      products.map((item) => {
        const {category} = item;

        return categoryArr.push(category)
      })

      const uniqueCategory = [...new Set(categoryArr)] //Filters out duplicates
      state.category = uniqueCategory
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
          //Delete Product cases
          .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("Product deleted")
          })
          .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
          })
          //Get Product cases
          .addCase(getProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.product = action.payload
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
          })
          //Update product cases
          .addCase(updateProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("Product Updated Successfully")
          })
          .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
          })
          
  }
});

export const {CALC_STORE_VALUE} = productSlice.actions
export const {CALC_OUTOFSTOCK} = productSlice.actions
export const {CALC_CATEGORY} = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading
export const selectTotalStoreValue = (state) => state.product.totalStoreValue
export const selectOutOfStock = (state) => state.product.outOfStock
export const selectCategory = (state) => state.product.category

export default productSlice.reducer