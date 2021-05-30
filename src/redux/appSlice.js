import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchData } from './api/';
import { PLAY_STATUS, PLAYER_SKIP_DURATION, PLAY_SPEED } from './constants';

const initialState = {
  loading: false,
  playStatus: PLAY_STATUS.STOPPED,
  playPosition: 0,
  playSpeed: PLAY_SPEED[0],
  duration: 0,
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
    setPlayStatus: (state, action) => {
      state.playStatus = action.payload;
    },
    setPlayPosition: (state, action) => {
      state.playPosition = action.payload;
    },
    moveForward: (state) => {
      state.playPosition = state.playPosition + PLAYER_SKIP_DURATION;
    },
    moveBackward: (state) => {
      state.playPosition = state.playPosition - PLAYER_SKIP_DURATION;
    },
    increasePlaySpeed: (state) => {
      state.playSpeed =
        PLAY_SPEED[
          (PLAY_SPEED.indexOf(state.playSpeed) + 1) % PLAY_SPEED.length
        ];
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
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

export const {
  setPlayStatus,
  setPlayPosition,
  moveBackward,
  moveForward,
  increasePlaySpeed,
  setDuration,
} = appSlice.actions;

export const selectUrl = (state) => state.app.url;
export const selectPlayStatus = (state) => state.app.playStatus;
export const selectPlayPosition = (state) => state.app.playPosition;
export const selectPlaySpeed = (state) => state.app.playSpeed;
export const selectLoading = (state) => state.app.loading;
export const selectTranscript = (state) => state.app.transcript;
export const selectTotalTime = (state) => state.app.words[state.app.words - 1];
export const selectDuration = (state) => state.app.duration;

export default appSlice.reducer;
