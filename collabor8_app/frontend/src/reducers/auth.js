import {
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    RESET_PASSWORD_CONFIRMED_SUCCESS,
    RESET_PASSWORD_CONFIRMED_FAILED,
    LOGOUT
} from "../actions/types";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    passwordResetStatus: null
};

export default function auth(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case LOAD_USER_FAILED:
            return {
                ...state,
                user:null
            }
        case LOGIN_FAILED:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case SIGNUP_FAILED:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAILED:
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATION_FAILED:
            return {
                ...state,
                isAuthenticated: false
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                passwordResetStatus: payload
            }
        case PASSWORD_RESET_FAILED:
            return {
                ...state,
                passwordResetStatus: payload
            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case RESET_PASSWORD_CONFIRMED_SUCCESS:
            return {
                ...state,
                passwordResetStatus: payload
            }
        case RESET_PASSWORD_CONFIRMED_FAILED:
            return {
                ...state,
                passwordResetStatus: payload
            }
        default:
            return state
    }
}
