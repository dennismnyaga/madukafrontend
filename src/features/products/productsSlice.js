import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookies from "cookies-js";
import config from "../../config";



const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;


const PRODUCTS_URLS = `${apiUrl}/products/`;
const POSTS_URL = `${apiUrl}/createproductsapi/`



const initialState = {
  products: [],
  status: "idle",
  error: null,
  uploadProgress: 0,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(PRODUCTS_URLS);
    return response.data;
  }
);






export const addNewProduct = createAsyncThunk(
    'products/addNewProduct',
    async (productData, { rejectWithValue, dispatch }) => {
      try {
        const authToken = cookies.get('accessToken');
        const headers = {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        };
  
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
          if (key === 'image') {
            value.forEach((image) => {
              formData.append('images', image);
            });
          } else {
            formData.append(key, value);
          }
        });
  
        const response = await axios.post(POSTS_URL, formData, { headers,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            dispatch(productsSlice.actions.setUploadProgress(progress));
          }, });
        return response;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productAdded: {
            reducer(state, action) {
                state.products.push(action.payload);
            },
        },
        setUploadProgress(state, action) {
          state.uploadProgress = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewProduct.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
              })
              
        },
    });

export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export const getProductsPostStatus = (state) => state.posts.status;
export const getProductsPostError = (state) => state.posts.error;

export const selectProductById = (state, productId) =>
state.products.products.find(product => product.id === productId);



export const { productAdded } = productsSlice.actions;
export default productsSlice.reducer;