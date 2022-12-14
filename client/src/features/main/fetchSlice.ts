import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchData } from './fetchAPI';

export interface FetchState {
  price: number;
  percent: number;
  status: 'idle' | 'loading';
}

const initialState: FetchState = {
  price: 0,
  percent: 0,
  status: 'idle',
};

// Fetch Data from Server and return
export const fetchAsync = createAsyncThunk(
  'fetch/fetchData',
  async (symbol: string) => {
    const response = await fetchData(symbol);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        // Send request to Server
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        // After Get Data from Server
        state.status = 'idle';
        state.price = action.payload.price;
        state.percent = action.payload.percent;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getFetch = (state: RootState) => state.fetchData;

export default fetchSlice.reducer;
