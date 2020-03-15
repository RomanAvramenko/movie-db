import { LOGIN_FORM_OPEN } from "../types";

const initialState = {
    open: false
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FORM_OPEN:
            return {
                ...state,
                open: action.payload
            }
        default: return state
    }
}