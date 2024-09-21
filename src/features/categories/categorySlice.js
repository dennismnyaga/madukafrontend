import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;
const CATEGORY_URLS = `${apiUrl}/productcategory/`;

const initialState = {
  categories: [],
  status: "idle",
  error: null,
}

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await axios.get(CATEGORY_URLS);
    return response.data;
  }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoryAdded: {
            reducer(state, action) {
                state.categories.push(action.payload);
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        },
    });

export const selectAllCategories = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;

export const { categoryAdded } = categoriesSlice.actions;
export default categoriesSlice.reducer;
