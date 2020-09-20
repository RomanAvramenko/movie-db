import { HEADER_TRAILER, HEADER_DATA_SUCCESS, HEADER_DATA_START, HEADER_DATA_FAILURE } from "../types";

const initialState = {
    data: [],
    trailerRes: [],
    loading: false,
    error: null
}

export const headerDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case HEADER_DATA_START:
          console.log('start')
            return {
                ...state,
                loading: true
            };
        case HEADER_DATA_SUCCESS:
          console.log('success')
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case HEADER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case HEADER_TRAILER:
            return {
                ...state,
                trailerRes: action.payload
            }
        default: return state
    }
}