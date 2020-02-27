import { CATALOG_DATA } from '../types'

const initialState = {
  response: []
}

export const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATALOG_DATA:
      return {
        ...state,
        response: action.payload
      }
    default: return state
  }
}