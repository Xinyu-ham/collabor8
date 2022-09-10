import {
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAILED 
} from "../actions/types";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null
};

export default function auth(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
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
            localStorage.removeItem('access', payload.access);
            localStorage.removeItem('refresh', payload.refresh);
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}
