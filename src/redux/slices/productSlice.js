import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'product/fetchProductStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get(
      `https://6645b3cdb8925626f892c714.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )

    return data
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.items = []
        console.log('loading')
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
        console.log('success')
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error'
        state.items = []
        console.log('error')
      })
  },
})

export const selectProductData = (state) => state.product

export const { setItems } = productSlice.actions

export default productSlice.reducer
