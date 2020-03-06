import { SEARCH_RESULTS_SUCCESS, SEARCH_RESULTS_START, SEARCH_RESULTS_FAILURE } from "../types";

const initialState = {
    searchResults: [],
    loading: false,
    error: null
}
export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESULTS_START:
            return {
                ...state,
                loading: true
            }
        case SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                searchResults: action.payload,
                loading: false
            }
        case SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default: return state
    }
}