import {
  CATALOG_DATA_RESPONSE,
  CATALOG_SEARCH_SELECTOR,
  CATALOG_CURRENT_PAGE,
  CATALOG_DATA_LENGTH,
  CATALOG_TOTAL_PAGES,
  CATALOG_HAS_MORE,
} from "../types";

export const catalogResults = (response) => {
  return {
    type: CATALOG_DATA_RESPONSE,
    payload: response,
  };
};

export const setSearchSelector = (selector)=> {
  return {
    type: CATALOG_SEARCH_SELECTOR,
    payload: selector
  }
}

export const setCurrentPage = (page)=> {
  return {
    type: CATALOG_CURRENT_PAGE,
    payload: page
  }
}

export const setDataLength = (number)=> {
  return {
    type: CATALOG_DATA_LENGTH,
    payload: number
  }
}

export const setTotalPages = (number)=> {
  return {
    type: CATALOG_TOTAL_PAGES,
    payload: number
  }
}

export const setHasMore = (number)=> {
  return {
    type: CATALOG_HAS_MORE,
  }
}