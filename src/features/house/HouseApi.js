import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/consts";

const neighborhoodName = 'aura'; // Replace with actual neighborhood name or parameter  
const API = {
    fetchAllHouses: `${BASE_URL}/api/house`,
    fetchAllHousesByNeighborhood: (name) => `${BASE_URL}/api/house/get/by-neighborhood?name=${name}`,
    fetchHouseById: (houseId) => `${BASE_URL}/api/house/${houseId}`,
}

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
            const response = await fetch(API.fetchAllHousesByNeighborhood(neighborhoodName));
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
            const response = await fetch(fetchHouseById(houseId));
            if (!response.ok) {
                throw new Error('Failed to fetch house');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateHouseThunk = createAsyncThunk(
  'house/updateHouse',
  async ({ houseId, houseData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/house/${houseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(houseData),
      });

      if (!response.ok) {
        throw new Error('Failed to update house');
      }

      return await response.json(); // return updated house or success message
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
