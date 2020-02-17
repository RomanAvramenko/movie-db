import { SEARCH_RESULTS } from "../types";


const initialState = {
    searchResults: []
}
export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            }
        default: return state
    }
}