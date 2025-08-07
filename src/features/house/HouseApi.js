import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/consts";

const neighborhoodName = 'aura'; // Replace with actual neighborhood name or parameter  

export const fetchAllHouses = createAsyncThunk(
    'house/fetchAllHouses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/houses`);
            if (!response.ok) {
                throw new Error('Failed to fetch houses');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAllHousesByNeighborhood = createAsyncThunk(
    'house/fetchAllHousesByNeighborhood',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/houses/get/by-neighborhood?name=${neighborhoodName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch houses by neighborhood');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchHouseById = createAsyncThunk(
    'house/fetchHouseById',
    async (houseId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/houses/${houseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch house');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
