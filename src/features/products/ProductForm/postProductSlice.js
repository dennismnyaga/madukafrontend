import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookies from "cookies-js";
import config from "../../../config";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "production"
    ? config.production.apiUrl
    : config.development.apiUrl;
const POSTS_URL = `${apiUrl}/createproductsapi/`;

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  uploadProgress: 0,
};

export const addNewProduct = createAsyncThunk(
  "posts/addNewProduct",
  async (productData, { rejectWithValue, dispatch }) => {
    try {
      const authToken = cookies.get("accessToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      };

      
  console.log("productData: ", productData)

      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "image") {
          value.forEach((image) => {
            formData.append("images", image);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(POSTS_URL, formData, {headers});
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.products.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getProductsPostStatus = (state) => state.posts.status;
export const getProductsPostError = (state) => state.posts.error;

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
