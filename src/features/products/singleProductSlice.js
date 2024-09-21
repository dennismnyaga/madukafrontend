import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;const PRODUCTS_URLS = `${apiUrl}/products/`;

const initialState = {
  product: [],
  status: "idle",
  error: null,
};

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const response = await axios.get(`${PRODUCTS_URLS}${productId}/`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: {
      reducer(state, action) {
        state.product.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getProductById = (state) => state.product.product;
export const getProductByIdStatus = (state) => state.product.status;
export const getProductByIdError = (state) => state.product.error;

export default productSlice.reducer;