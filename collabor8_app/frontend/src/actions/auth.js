import axios from 'axios'
import {
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAILED,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
    LOGOUT
} from "./types";

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access') })

        try {
            const response = await axios.post("/auth/jwt/verify/", body, config)
            if (response.data.code !== 'token_not_valid') {
                dispatch(
                    {type: AUTHENTICATION_SUCCESS}
                )
            } else {
                dispatch(
                    {type: AUTHENTICATION_FAILED}
                )
            };
        } catch(err) {
            dispatch(
                {type: AUTHENTICATION_FAILED}
            )
        };
    } else {
        dispatch(
            {type: AUTHENTICATION_FAILED}
        )
    };
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        } 

        try {
            const response = await axios.get("/auth/users/me/", config)
    
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: response.data
            })

            dispatch(load_user);
        } catch (err) {
            dispatch({
                type: LOAD_USER_FAILED,
            })
        };
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',       
        }
    }

    const body = JSON.stringify({ email:email, password:password });
    try {
        const response = await axios.post("/auth/jwt/create/", body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: LOGIN_FAILED,
            payload: err
        })
    };
};