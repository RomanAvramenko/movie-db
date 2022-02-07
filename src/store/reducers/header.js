import {
  HEADER_TRAILER_START,
  HEADER_DATA_SUCCESS,
  HEADER_DATA_START,
  HEADER_DATA_FAILURE,
  HEADER_TRAILER_SUCCESS,
  HEADER_TRAILER_FAILURE,
} from "../types";

const initialState = {
  data: [],
  trailerRes: [],
  loading: false,
  error: null,
};

export const headerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEADER_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case HEADER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case HEADER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case HEADER_TRAILER_START:
      return {
        ...state,
        loading: true,
      };
    case HEADER_TRAILER_SUCCESS:
      return {
        ...state,
        trailerRes: action.payload,
        loading: false,
      };
    case HEADER_TRAILER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
