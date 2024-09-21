import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookies from "cookies-js";
import config from "../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;const SHOPS_URLS = `${apiUrl}/shop/`;


const POST_URL = `${apiUrl}/shopcreateapi/`;

const initialState = {
  shops: [],
  status: "idle",
  error: null,
};

export const fetchShops = createAsyncThunk("shops/fetchShops", async () => {
  const response = await axios.get(SHOPS_URLS);
  return response.data;
});

export const addNewShop = createAsyncThunk(
  "shops/addNewShop",
  async (shopData, { rejectWithValue }) => {
    try {
      const authToken = cookies.get("accessToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      Object.entries(shopData).forEach(([key, value]) => {
        if (key === "shopimages") {
          value.forEach((shopimages) => {
            formData.append("shopimages", shopimages);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(POST_URL, formData, { headers });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    shopAdded: {
      reducer(state, action) {
        state.shops.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShops.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shops = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllShops = (state) => state.shops.shops;
export const getShopsStatus = (state) => state.shops.status;
export const getShopsError = (state) => state.shops.error;

// export const selectShopById = (state, shopId) =>
//   state.shops.shops.find((shop) => shop.id === shopId);



export const { shopAdded } = shopsSlice.actions;
export default shopsSlice.reducer;



// export const getProductById = (state) => state.product.product;
// export const getProductByIdStatus = (state) => state.product.status;
// export const getProductByIdError = (state) => state.product.error;
