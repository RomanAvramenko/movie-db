import axios from 'axios';
import { SEARCH_RESULTS } from "../types"
import { API_KEY, SEARCH_URL } from '../../constants';

export const getSearchData = (name) => {
  return async dispatch => {
    const url = `${SEARCH_URL}?${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
    await axios
      .get(url)
      .then(result => dispatch(searchResults(result.data.results)))
      .catch(e => { console.log(e.config) });
  }
}

const searchResults = (result) => {
  return {
    type: SEARCH_RESULTS,
    payload: result
  }
}