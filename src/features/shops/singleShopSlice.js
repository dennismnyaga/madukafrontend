import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;const SHOP_URLS =`${apiUrl}/shop/`;

const initialState = {
  shop: [],
  status: "idle",
  error: null,
};

export const fetchShopById = createAsyncThunk(
  "shop/fetchShopById",
  async (shopIdNum) => {
    const response = await axios.get(`${SHOP_URLS}${shopIdNum}/`);
    return response.data;
  }
);

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    shopAdded: {
      reducer(state, action) {
        state.shop.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShopById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchShopById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shop = action.payload;
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getShopById = (state) => state.shop.shop;
export const getShopByIdStatus = (state) => state.shop.status;
export const getShopByIdError = (state) => state.shop.error;

export default shopSlice.reducer;
