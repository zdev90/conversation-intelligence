import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Sound from 'react-sound';

import { fetchData } from './api/';

const initialState = {
  loading: false,
  status: Sound.status.STOPPED,
  url: null,
  transcript: null,
};

export const loadData = createAsyncThunk('app/fetchData', async () => {
  const { data } = await fetchData();

  return data;
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        const { url, transcript } = action.payload;
        state.loading = false;
        state.url = url;
        state.transcript = transcript;
      });
  },
});

export const { setStatus } = appSlice.actions;

export const selectUrl = (state) => state.app.url;
export const selectStatus = (state) => state.app.status;
export const selectLoading = (state) => state.app.loading;

export default appSlice.reducer;
