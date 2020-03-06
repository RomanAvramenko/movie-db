import axios from 'axios';
import { SEARCH_RESULTS_START, SEARCH_RESULTS_SUCCESS, SEARCH_RESULTS_FAILURE } from "../types"
import { API_KEY, SEARCH_URL } from '../../constants';

export const getSearchData = (name) => {
  return async dispatch => {
    dispatch(searchStarted())
    const url = `${SEARCH_URL}?${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
    await axios
      .get(url)
      .then(result => dispatch(searchResults(result.data.results)))
      .catch(e => { dispatch(searchFailure(e.config)) });
  }
}

const searchStarted = () => ({
  type: SEARCH_RESULTS_START
})

const searchResults = (result) => {
  return {
    type: SEARCH_RESULTS_SUCCESS,
    payload: result
  }
}

const searchFailure = error => {
  return {
    type: SEARCH_RESULTS_FAILURE,
    payload: error
  }
}