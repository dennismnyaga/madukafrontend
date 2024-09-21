import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookies from "cookies-js";
import config from "../../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;const POST_URL =`${apiUrl}/shopcreateapi/`;

const initialState = {
  shoppost: [],
  status: "idle",
  error: null,
};


export const addNewShop = createAsyncThunk(
  "shoppost/addNewShop",
  async (shopData, { rejectWithValue, dispatch }) => {
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

      console.log("shopData: ", shopData)

      
      // const response = await axios.post(POST_URL, formData, { headers });
      const response = await axios.post(POST_URL, formData, { headers });
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const shoppostSlice = createSlice({
  name: "shoppost",
  initialState,
  reducers: {
    shopAdded: {
      reducer(state, action) {
        state.shoppost.push(action.payload);
      },
    },
   
  },
  extraReducers(builder) {
    builder
    //   =============================================
    .addCase(addNewShop.pending, (state) => {
        state.status = 'loading';
      })
    .addCase(addNewShop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shoppost.push(action.payload);
    })
    .addCase(addNewShop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});



export const getProductsPostStatus = (state) => state.shoppost.status;
export const getProductsPostError = (state) => state.shoppost.error;




export const { shopAdded } = shoppostSlice.actions;
export default shoppostSlice.reducer;