import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;const LOCATIONS_URLS = `${apiUrl}/location/`;

const initialState = {
  locations: [],
  status: "idle",
  error: null,
}

export const fetchLocations = createAsyncThunk("locations/fetchLocations", async () => {
    const response = await axios.get(LOCATIONS_URLS);
    return response.data;
  }
);

const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        locationAdded: {
            reducer(state, action) {
                state.locations.push(action.payload);
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLocations.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        },
    });

export const selectAllLocations = (state) => state.locations.locations;
export const getLocationsStatus = (state) => state.locations.status;
export const getLocationsError = (state) => state.locations.error;

export const { locationAdded } = locationsSlice.actions;
export default locationsSlice.reducer;
