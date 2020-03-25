import {
  AUTH_LOGINFORM_OPEN,
  AUTH_SIGNUPFORM_OPEN,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_GET_PAGE, 
} from "../types";
import axios from "axios";

export const autoLogout = time => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(readWishList(userId));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userId
  };
};

export const readWishList = id => {
  return async dispatch => {
    await axios
      .get(`https://the-movie-box-d0ca7.firebaseio.com/users/${id}.json`)
      .then(response => {
        dispatch({
          type: AUTH_GET_PAGE,
          payload: response.data
        });
      });
  };
};

export const setLogin = value => {
  return {
    type: AUTH_LOGINFORM_OPEN,
    payload: value
  };
};

export const setSignUp = value => {
  return {
    type: AUTH_SIGNUPFORM_OPEN,
    payload: value
  };
};
