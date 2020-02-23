import { CATALOG_DATA } from '../types'

const initialState = {
  response: [],
  currentPage: 1,
  totalPages: null,
}

export const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATALOG_DATA:
      return {
        ...state,
        response: action.response,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      }
    default: return state
  }
}