import { combineReducers } from '@reduxjs/toolkit';
import { sessionReducer } from '../features/session/session.slice';

export const rootReducer = combineReducers({
  session: sessionReducer,
});
