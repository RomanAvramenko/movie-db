import { AUTH_LOGINFORM_OPEN, AUTH_SIGNUPFORM_OPEN, AUTH_SUCCESS, AUTH_LOGOUT } from "../types";

const initialState = {
    logIn: false,
    signUp: false,
    token: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGINFORM_OPEN:
            return {
                ...state,
                logIn: action.payload
            }
        case AUTH_SIGNUPFORM_OPEN:
            return {
                ...state,
                signUp: action.payload
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        default: return state
    }
}