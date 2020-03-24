import { USER_PAGE_POST, USER_PAGE_GET } from "../types";

const initialState = {
  list: null
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

    default:
      return state;
  }
};
