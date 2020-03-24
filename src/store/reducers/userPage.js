import { USER_PAGE_POST, USER_PAGE_GET, USER_PAGE_FETCH } from "../types";

const initialState = {
  list: null,
  responseList: []
};

export const userPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PAGE_POST:
      return {
        ...state
      };
    case USER_PAGE_GET:
      return {
        ...state,
        list: action.payload
      };
      case USER_PAGE_FETCH:
      return {
        ...state,
        responseList: [...state.responseList, action.payload]
      };
    default:
      return state;
  }
};
