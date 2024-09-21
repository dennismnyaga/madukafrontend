import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;const SEARCH_URLS = `${apiUrl}/productsearch/`;

const initialState = {
  searches: [],
  status: "idle",
  error: null,
}

// export const fetchSearches = createAsyncThunk("searches/fetchSearches", async () => {
//     const response = await axios.get(SEARCH_URLS);
//     return response.data;
//   }
// );
export const fetchSearches = createAsyncThunk("searches/fetchSearches", async (searchParams, { rejectWithValue }) => {
    try{
        const response = await axios.get(SEARCH_URLS, { params: searchParams });
        return response.data;
    } catch (error){
        if(!error.response){
            throw error
        }
        return rejectWithValue(error.response.data);
    }
  });

const searchesSlice = createSlice({
    name: "searches",
    initialState,
    reducers: {
        searchAdded: {
            reducer(state, action) {
                state.searches.push(action.payload);
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSearches.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchSearches.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.searches = action.payload;
            })
            .addCase(fetchSearches.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.error;
            });
        },
    });

export const selectAllsearches = (state) => state.searches.searches;
export const getSearchesStatus = (state) => state.searches.status;
export const getSearchesError = (state) => state.searches.error;

export const { searchAdded } = searchesSlice.actions;
export default searchesSlice.reducer;
