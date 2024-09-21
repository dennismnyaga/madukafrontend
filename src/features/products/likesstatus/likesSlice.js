import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;const LIKE_URLS = `${apiUrl}/productlike/`;
const UNLIKE_URLS = `${apiUrl}/productunlike/`;
const LIKES_URLS = `${apiUrl}/likes/`;

const initialState = {
  product: null,
  status: "idle",
  error: null,
  likes: [],
};

export const fetchLikes = createAsyncThunk(
  "liked/fetchLikes",
  async ({productId, user_id}) => {
    const response = await axios.post(`${LIKES_URLS}`, {user_id, productId});
    console.log('sent product id is ', productId)
    return response.data;
  }
);

export const postLike = createAsyncThunk(
  "liked/postLike",
  async ({productId, pk, userId}) => {
    console.log('This is the sent PK:',  userId)
    const response = await axios.post(`${LIKE_URLS}${productId}/`, {product_id: productId, user_id: userId});
    return response.data;
  }
);

export const postUnlike = createAsyncThunk(
  "liked/postUnlike",
  async ({productId, userId}) => {
    console.log('This is the sent PK:',  userId)
    const response = await axios.post(`${UNLIKE_URLS}`,{product_id: productId, user_id: userId});
    return response.data;
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    fetchLikedProductById: {
      reducer(state, action) {
        state.likes.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchLikes.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(fetchLikes.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log('Fechecd the likes ', action.payload)
      state.product = action.payload;
    })
    .addCase(fetchLikes.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
      .addCase(postLike.fulfilled, (state, action) => {
        state.likes.push(action.payload);
        console.log("This is the payload ", action.payload)
      })
      .addCase(postUnlike.fulfilled, (state, action) => {
        state.likes = state.likes.filter(
          (like) => like.product_id !== action.payload.product_id
        );
      });
  },
});

export const getLikesById = (state) => state.likes.product;




export default likesSlice.reducer;
