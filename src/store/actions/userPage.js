import axios from "axios";
import { USER_PAGE_POST, USER_PAGE_FETCH } from "../types";
import { store } from "../store";
import { BASE_URL, API_KEY } from "../../constants";
import { readWishList } from "./auth";

const URL = "https://the-movie-box-d0ca7.firebaseio.com/users";
const list = store.getState().auth.list;
const { responseList } = store.getState().userPage;

export const addToWishList = (userId, movieId, event) => {
  event.preventDefault();
  event.stopPropagation();
  return async dispatch => {
    await dispatch(readWishList(userId));
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

export const fetchWishList = itemList => {
  return dispatch => {
    if (!!itemList) {
      Object.values(itemList).map(async item => {
        return await axios
          .get(`${BASE_URL}/${item}?${API_KEY}&language=en-US`)
          .then(response => {
            if (!responseList.some(item => item.id === response.data.id)) {
              return dispatch(loadWishListData(response.data));
            }
          });
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
