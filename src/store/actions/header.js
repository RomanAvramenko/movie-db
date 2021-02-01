import {
  HEADER_TRAILER,
  HEADER_DATA_SUCCESS,
  HEADER_DATA_START,
  HEADER_DATA_FAILURE,
} from "../types";

export const headerDataStarted = () => ({
  type: HEADER_DATA_START,
});

export const headerData = (data) => {
  console.log(data)
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
