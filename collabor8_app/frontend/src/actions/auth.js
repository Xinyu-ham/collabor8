import axios from 'axios'
import {
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAILED 
} from "./types";

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
                payload: err
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