import {
  AUTH_LOGINFORM_OPEN,
  AUTH_SIGNUPFORM_OPEN,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_GET_PAGE
} from "../types";

const initialState = {
  logIn: false,
  signUp: false,
  token: null,
  userId: null,
  list: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGINFORM_OPEN:
      return {
        ...state,
        logIn: action.payload
      };
    case AUTH_SIGNUPFORM_OPEN:
      return {
        ...state,
        signUp: action.payload
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };
    case AUTH_GET_PAGE:
      return {
        ...state,
        list: action.payload
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        list: null
      };
    default:
      return state;
  }
};
