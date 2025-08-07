import { createSlice } from "@reduxjs/toolkit";
import { fetchAllHouses, fetchAllHousesByNeighborhood, fetchHouseById, updateHouseThunk } from "./HouseApi";

const initialState = {
    house: null,
    loading: false,
    error: null,
    success: false,
    message: null,
    houseEditModal: false,
    houseEditData: null,
}

export const HouseSlice = createSlice({
    name: 'HouseSlice',
    initialState,
    reducers: {
        toggleHouseEditModal: (state) => {
            state.houseEditModal = !state.houseEditModal;
        },
        setHouseEditModal: (state, action) => {
            state.houseEditModal = action.payload;
        },
        setHouseEditData: (state, action) => {
            state.houseEditData = action.payload;
        }
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
            })
            .addCase(updateHouseThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHouseThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.house.findIndex(h => h.id === action.payload.id);
                if (index !== -1) {
                    state.house[index] = action.payload;
                }
                state.success = true;
                state.message = "House updated successfully!";
            })
            .addCase(updateHouseThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "Failed to update house.";
            });
    }
});

export const {
    // Add any reducers if needed
    toggleHouseEditModal,
    setHouseEditModal,
    setHouseEditData
} = HouseSlice.actions;

export const getHouseData = (state) => state.HouseSlice.house;
export const getHouseLoading = (state) => state.HouseSlice.loading;
export const getHouseError = (state) => state.HouseSlice.error;
export const getHouseSuccess = (state) => state.HouseSlice.success;
export const getHouseMessage = (state) => state.HouseSlice.message;
export const getHouseEditModalState = (state) => state.HouseSlice.houseEditModal;
export const getHouseEditData = (state) => state.HouseSlice.houseEditData;

export default HouseSlice.reducer;