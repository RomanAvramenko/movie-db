import {
  CATALOG_DATA_RESPONSE,
  CATALOG_SEARCH_SELECTOR,
  CATALOG_CURRENT_PAGE,
  CATALOG_DATA_LENGTH,
  CATALOG_TOTAL_PAGES,
  CATALOG_HAS_MORE,
} from "../types";

const initialState = {
  response: [],
  searchSelector: "/popular",
  currentPage: 1,
  dataLength: null,
  totalPages: null,
  hasMore: true,
};

export const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATALOG_DATA_RESPONSE:
      return {
        ...state,
        response: action.payload,
      };
    case CATALOG_SEARCH_SELECTOR:
      return {
        ...state,
        searchSelector: action.payload,
      };
    case CATALOG_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case CATALOG_DATA_LENGTH:
      return {
        ...state,
        dataLength: action.payload,
      };
    case CATALOG_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case CATALOG_HAS_MORE:
      return {
        ...state,
        hasMore: false,
      };
    default:
      return state;
  }
};
