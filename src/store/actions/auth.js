import {
  AUTH_LOGINFORM_OPEN,
  AUTH_SIGNUPFORM_OPEN,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_GET_PAGE,
  AUTH_USER_PAGE_POST,
  AUTH_USER_PAGE_FETCH,
  AUTH_USER_REMOVE_ITEM
} from "../types";
import axios from "axios";
import { store } from "../store";
import { BASE_URL, API_KEY } from "../../constants";

const URL = "https://the-movie-box-d0ca7.firebaseio.com/users";

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

export const addToWishList = (userId, movieId, event) => {
  event.preventDefault();
  event.stopPropagation();
  return async dispatch => {
    await dispatch(readWishList(userId));
    if (
      Object.keys(store.getState().auth.list).length > 0 &&
      !Object.values(store.getState().auth.list).some(item => item === movieId)
    ) {
      await axios.post(`${URL}/${userId}.json`, movieId);
      dispatch({
        type: AUTH_USER_PAGE_POST
      });
    } else if (Object.keys(store.getState().auth.list).length === 0) {
      await axios.post(`${URL}/${userId}.json`, movieId);
      dispatch({
        type: AUTH_USER_PAGE_POST
      });
    }
  };
};

export const readWishList = id => {
  return async dispatch => {
    await axios.get(`${URL}/${id}.json`).then(response => {
      if (response.data) {
        dispatch({
          type: AUTH_GET_PAGE,
          payload: response.data
        });
      }
    });
  };
};

export const fetchWishList = itemList => {
  return dispatch => {
    if (itemList) {
      Object.values(itemList).map(async item => {
        return await axios
          .get(`${BASE_URL}/${item}?${API_KEY}&language=en-US`)
          .then(response => {
            if (
              !store
                .getState()
                .auth.responseList.some(item => item.id === response.data.id)
            ) {
              return dispatch(loadWishListData(response.data));
            }
          });
      });
    }
  };
};

export const removeFromWishList = (userId, itemId, event) => {
  return dispatch => {
    event.preventDefault();
    event.stopPropagation();
    for (let [key, value] of Object.entries(store.getState().auth.list)) {
      console.log(key, value);

      if (value === itemId) {
        console.log(key, value);
        axios.delete(`${URL}/${userId}/${key}.json`);
      }
    }
    dispatch({
      type: AUTH_USER_REMOVE_ITEM,
      response: store
        .getState()
        .auth.responseList.filter(item => item.id !== itemId),
      payload: Object.values(store.getState().auth.list).filter(
        item => item !== itemId
      )
    });
  };
};

const loadWishListData = data => {
  return {
    type: AUTH_USER_PAGE_FETCH,
    payload: data
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
