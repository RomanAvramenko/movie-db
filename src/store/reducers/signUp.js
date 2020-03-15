import { SIGNUP_FORM_OPEN } from "../types";

const initialState = {
    open: false
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_FORM_OPEN:
            return {
                ...state,
                open: action.payload
            }
        default: return state
    }
}