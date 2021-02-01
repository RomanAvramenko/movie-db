import {
  DETAILED_INFO_FAILURE,
  DETAILED_INFO_START,
  DETAILED_INFO_SUCCESS,
} from "../types";

const initialState = {
  response: null,
  trailerResp: [],
  creditsResp: [],
  loading: false,
  error: null,
};
export const detailedReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILED_INFO_START:
      return {
        ...state,
        loading: true,
      };
    case DETAILED_INFO_SUCCESS:
      return {
        ...state,
        response: action.response,
        trailerResp: action.trailer,
        creditsResp: action.credits,
        loading: false,
      };
    case DETAILED_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
