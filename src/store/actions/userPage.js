import axios from "axios";
import { USER_PAGE_POST, USER_PAGE_GET, USER_PAGE_FETCH } from "../types";
import { store } from "../store";
import { BASE_URL, API_KEY } from "../../constants";

const URL = "https://the-movie-box-d0ca7.firebaseio.com/users";
const list = store.getState().userPage.list;

export const addToWishList = (userId, movieId, event) => {
  event.preventDefault();
  event.stopPropagation();
  return async dispatch => {
    await dispatch(readWishList(userId));
    console.log(!!list);
    if (
      !!list &&
      !Object.values(store.getState().userPage.list).some(
        item => item === movieId
      )
    ) {
      await axios.post(`${URL}/${userId}.json`, movieId);
      dispatch({
        type: USER_PAGE_POST
      });
    } else if (!list) {
      await axios.post(`${URL}/${userId}.json`, movieId);
      dispatch({
        type: USER_PAGE_POST
      });
    }
  };
};

export const readWishList = id => {
  console.log(store.getState().userPage);
  return async dispatch => {
    await axios
      .get(`https://the-movie-box-d0ca7.firebaseio.com/users/${id}.json`)
      .then(response => {
        dispatch({
          type: USER_PAGE_GET,
          payload: response.data
        });
      });
  };
};

export const fetchWishList = (itemList) => {
  return dispatch => {
    if (!!itemList) {
      Object.values(itemList).map(async item => {
        return await axios
          .get(`${BASE_URL}/${item}?${API_KEY}&language=en-US`)
          .then(response => dispatch(loadWishListData(response.data)));
      });
    }
  };
};

const loadWishListData = data => {
  return {
    type: USER_PAGE_FETCH,
    payload: data
  };
};
