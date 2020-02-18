import { DETAILED_INFO } from "../types"

const initialState = {
    response: null,
    trailerResp: [],
    creditsResp: []
}
export const detailedReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAILED_INFO:
            return {
                ...state,
                response: action.response,
                trailerResp: action.trailer,
                creditsResp: action.credits
            }
        default: return state
    }
}