import { put, all, call, takeEvery } from "redux-saga/effects";
import {
  HEADER_DATA_START,
  HEADER_DATA_SUCCESS,
  HEADER_TRAILER,
} from "./types";
import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";
import { headerData, headerDataFailure, headerTrailer } from "./actions/header";

function fetchData(url) {
  return axios({
    method: "get",
    url: url,
  });
}

function* getData(action) {
  console.log("object");
  const url = `${BASE_URL}/popular?${API_KEY}&language=en-US&page=1`;
  try {
    const result = yield call(fetchData(url));
    const data = result.data.result;
    const idVideo = result.data.results[action.id].id;
    yield put({ type: HEADER_DATA_SUCCESS, data });
    yield call(getVideo(idVideo));
  } catch (error) {
    yield put(headerDataFailure(error));
  }
}

function* getVideo(id) {
  const url = `${BASE_URL}/${id}/videos?${API_KEY}`;
  try {
    const result = yield call(fetchData(url));
    const trailerRes = result.data.results;
    yield put(headerTrailer(trailerRes));
  } catch (error) {
    yield put(headerDataFailure(error));
  }
}

function* watchHeaderDataStarted() {
  yield takeEvery({ HEADER_DATA_START, getData });
}

function* watchHeaderTrailer() {
  yield takeEvery({ HEADER_TRAILER, getVideo });
}

export default function* rootSaga() {
  yield all([watchHeaderDataStarted(), watchHeaderTrailer()]);
}
