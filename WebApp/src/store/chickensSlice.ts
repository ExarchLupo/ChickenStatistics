import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChickenDto } from '../types';
import { API_BASE_URL } from '../api';

export const fetchChickens = createAsyncThunk('chickens/fetchChickens', async () => {
  const res = await fetch(`${API_BASE_URL}/chickens`);
  return (await res.json()) as ChickenDto[];
});

export const addChicken = createAsyncThunk('chickens/addChicken', async (chicken: Omit<ChickenDto, 'id'>) => {
  const res = await fetch(`${API_BASE_URL}/chickens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chicken)
  });
  return (await res.json()) as ChickenDto;
});

export interface ChickensState {
  chickens: ChickenDto[];
  loading: boolean;
}

const initialState: ChickensState = {
  chickens: [],
  loading: false
};

const chickensSlice = createSlice({
  name: 'chickens',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChickens.pending, state => { state.loading = true; })
      .addCase(fetchChickens.fulfilled, (state, action: PayloadAction<ChickenDto[]>) => {
        console.log('Fetched chickens:', action.payload);
        state.chickens = action.payload;
        state.loading = false;
      })
      .addCase(fetchChickens.rejected, state => { state.loading = false; })
      .addCase(addChicken.fulfilled, (state, action: PayloadAction<ChickenDto>) => {
        state.chickens.push(action.payload);
      });
  }
});

export default chickensSlice.reducer;
