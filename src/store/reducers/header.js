import { HEADER_DATA, HEADER_TRAILER } from "../types";

const initialState = {
    data: [],
    trailerRes: []
}

export const headerDataReducer = (state=initialState, action) => {
    switch (action.type) {
        case HEADER_DATA:
            return {
                ...state,
                data: action.payload
            }
        case HEADER_TRAILER:
            return {
                ...state,
                trailerRes: action.payload
            }
        default: return state
    }
}