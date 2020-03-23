import axios from 'axios';
import { USER_PAGE_POST, USER_PAGE_GET } from '../types';

const URL = 'https://the-movie-box-d0ca7.firebaseio.com/users'

export const addToWishList = (userId, movieId) => {
  return async dispatch => {
    await axios.post(`${URL}/${userId}.json`, movieId)
    dispatch({
      type: USER_PAGE_POST
    })
  }
}

export const readWishList = (id) => {
  return async dispatch => {
    await axios
      .get(`https://the-movie-box-d0ca7.firebaseio.com/users/${id}.json`)
      .then(response => {
        dispatch({
          type: USER_PAGE_POST,
          payload: response
        })
        console.log(response)
      })
  }
}
