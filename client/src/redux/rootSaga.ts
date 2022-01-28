import { all } from 'redux-saga/effects';

import { watchSessionSaga } from '../features/session/session.sagas';

export function* rootSaga() {
  yield all([watchSessionSaga()]);
}
