import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  createSessionRequest,
  createSessionSuccess,
  createSessionFailure,
} from './session.slice';

interface CreateSessionData {
  email: string;
  password: string;
}

const createSessionAPI = async (data: CreateSessionData) => {
  const response = await axios.post('http://localhost:3000/users/login', data);

  return response.data as { token: string };
};

function* createSessionRequestSaga(action: PayloadAction<CreateSessionData>) {
  try {
    const data = action.payload;

    const response: { token: string } = yield call(createSessionAPI, data);

    yield put(createSessionSuccess(response));
  } catch (error) {
    yield put(createSessionFailure());
  }
}

export function* watchSessionSaga() {
  yield takeLatest(createSessionRequest.type, createSessionRequestSaga);
}
