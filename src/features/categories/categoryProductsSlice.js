import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;
const CATEGORYPRODUCT_URLS = `${apiUrl}/apicategoryproduct/`;
const initialState = {
  categoryproduct: [],
  status: "idle",
  error: null,
}

export const fetchCategoryProducts = createAsyncThunk("categoryproduct/fetchCategoryProducts", async (categoryIdNum) => {
    const response = await axios.get(`${CATEGORYPRODUCT_URLS}${categoryIdNum}/`);
    return response.data;
  }
);

const categoryproductSlice = createSlice({
    name: "categoryproduct",
    initialState,
    reducers: {
        categoryAdded: {
            reducer(state, action) {
                state.categoryproduct.push(action.payload);
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategoryProducts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categoryproduct = [];
                state.categoryproduct = state.categoryproduct.concat(action.payload);
            })
            .addCase(fetchCategoryProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        },
    });

export const selectAllCategoryProduct = (state) => state.categoryproduct.categoryproduct;
export const getCategoryProductStatus = (state) => state.categoryproduct.status;
export const getCategoryProductError = (state) => state.categoryproduct.error;

export const { categoryAdded } = categoryproductSlice.actions;
export default categoryproductSlice.reducer;
