import axios from "axios";
import {
  HEADER_TRAILER,
  HEADER_DATA_SUCCESS,
  HEADER_DATA_START,
  HEADER_DATA_FAILURE,
} from "../types";
import { BASE_URL, API_KEY } from "../../constants";

export const getData = () => {
  return async (dispatch) => {
    dispatch(headerDataStarted());
    const url = `${BASE_URL}/popular?${API_KEY}&language=en-US&page=1`;
    await axios
      .get(url)
      .then((result) => {
        dispatch(headerData(result.data.results));
        /* const idVideo = result.data.results[id].id;
        dispatch(getVideo(idVideo)); */
      })
      .catch((e) => {
        dispatch(headerDataFailure(e.config));
      });
  };
};

export const getVideo = (id) => {
  return async (dispatch) => {
    const urlVideo = `${BASE_URL}/${id}/videos?${API_KEY}`;
    await axios
      .get(urlVideo)
      .then((result) => {
        dispatch(headerTrailer({ trailerRes: result.data.results }));
      })
      .catch((e) => {
        dispatch(headerDataFailure(e.config));
      });
  };
};

export const headerDataStarted = () => ({
  type: HEADER_DATA_START,
});

export const headerData = (data) => {
  return {
    type: HEADER_DATA_SUCCESS,
    payload: data,
  };
};

export const headerDataFailure = (error) => {
  return {
    type: HEADER_DATA_FAILURE,
    payload: error,
  };
};

export const headerTrailer = (trailerRes) => {
  return {
    type: HEADER_TRAILER,
    payload: trailerRes,
  };
};
