import axios from "axios";
import { USER_PAGE_POST, USER_PAGE_GET } from "../types";
import { store } from "../store";

const URL = "https://the-movie-box-d0ca7.firebaseio.com/users";

export const addToWishList = (userId, movieId, event) => {
  event.preventDefault()
  event.stopPropagation();
  return async dispatch => {
    await dispatch(readWishList(userId));
    const userWishList = store.getState().userPage.list;
    console.log(!!userWishList);
    if (
      !!userWishList &&
      !Object.values(store.getState().userPage.list).some(
        item => item === movieId
      )
    ) {
      await axios.post(`${URL}/${userId}.json`, movieId);
      dispatch({
        type: USER_PAGE_POST
      });
    } else if (!userWishList) {
      await axios.post(`${URL}/${userId}.json`, movieId);
      dispatch({
        type: USER_PAGE_POST
      });
    }
  };
};

export const readWishList = id => {
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
