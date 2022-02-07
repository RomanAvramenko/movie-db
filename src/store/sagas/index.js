import { put, all, call, takeEvery, spawn, apply } from "redux-saga/effects";
import {
  HEADER_DATA_FAILURE,
  HEADER_DATA_START,
  HEADER_DATA_SUCCESS,
  HEADER_TRAILER_START,
  HEADER_TRAILER_SUCCESS,
  HEADER_TRAILER_FAILURE,
} from "../types";
import { API_KEY, BASE_URL } from "../../constants";



function* fetchHeaderData() {
  try {
    const url = `${BASE_URL}/popular?${API_KEY}&language=en-US&page=1`;
    const request = yield call(fetch, url);
    const data = yield apply(request, request.json);

    yield put({ type: HEADER_DATA_SUCCESS, payload: data.results });
  } catch (error) {
    yield put({ type: HEADER_DATA_FAILURE, error });
  }
}

function* fetchHeaderTrailer({ payload }) {
  try {
    const url = `${BASE_URL}/${payload}/videos?${API_KEY}`;
    const request = yield call(fetch, url);
    const data = yield apply(request, request.json);
    yield put({ type: HEADER_TRAILER_SUCCESS, payload: data.results });
  } catch (error) {
    yield put({ type: HEADER_TRAILER_FAILURE, error });
  }
}

function* loadHeaderData() {
  yield takeEvery(HEADER_DATA_START, fetchHeaderData);
}

function* loadHeaderTrailer() {
  yield takeEvery(HEADER_TRAILER_START, fetchHeaderTrailer);
}

export default function* rootSaga() {
  const sagas = [loadHeaderData, loadHeaderTrailer];

  const retrySagas = yield sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });

  yield all(retrySagas);
}
