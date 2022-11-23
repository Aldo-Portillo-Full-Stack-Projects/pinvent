import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: [],
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {

    }
  }
});

export const {FILTER_BY_SEARCH} = filterSlice.actions

export const selectFilteredProduct = (state) => state.filter.filteredProducts

export default filterSlice.reducer