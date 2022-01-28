import { createSlice } from '@reduxjs/toolkit';
import { RequestStatuses } from '../../interface/network';

const initialState = {
  token: null,
  status: RequestStatuses.idle,
};

export const session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    createSessionRequest(state, { payload }) {
      state.status = RequestStatuses.loading;
    },
    createSessionSuccess(state, { payload }) {
      state.status = RequestStatuses.loaded;
      state.token = payload.token;
      localStorage.setItem('beesknees-token', payload.token);
    },
    createSessionFailure(state) {
      state.status = RequestStatuses.error;
    },
  },
});

export const {
  createSessionRequest,
  createSessionSuccess,
  createSessionFailure,
} = session.actions;

export const sessionReducer = session.reducer;
