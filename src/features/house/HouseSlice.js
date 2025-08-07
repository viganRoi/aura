import { createSlice } from "@reduxjs/toolkit";
import { fetchAllHouses, fetchAllHousesByNeighborhood, fetchHouseById } from "./HouseApi";

const initialState = {
    house: null,
    loading: false,
    error: null,
    success: false,
    message: null,
}

export const HouseSlice = createSlice({
    name: 'house',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllHouses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllHouses.fulfilled, (state, action) => {
                state.loading = false;
                state.house = action.payload;
                state.success = true;
            })
            .addCase(fetchAllHouses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(fetchAllHousesByNeighborhood.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllHousesByNeighborhood.fulfilled, (state, action) => {
                state.loading = false;
                state.house = action.payload;
                state.success = true;
            })
            .addCase(fetchAllHousesByNeighborhood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(fetchHouseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHouseById.fulfilled, (state, action) => {
                state.loading = false;
                state.house = action.payload;
                state.success = true;
            })
            .addCase(fetchHouseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const {
    // Add any reducers if needed
} = HouseSlice.actions;

export const getHouseData = (state) => state.HouseSlice.house;
export const getHouseLoading = (state) => state.HouseSlice.loading;
export const getHouseError = (state) => state.HouseSlice.error;
export const getHouseSuccess = (state) => state.HouseSlice.success;
export const getHouseMessage = (state) => state.HouseSlice.message;

export default HouseSlice.reducer;