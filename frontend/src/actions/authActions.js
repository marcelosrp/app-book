import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function login(data) {
    return dispatch => {
        return axios.post('http://localhost:4000/auth', data).then(res => {
            const token = res.data.token;
            
            localStorage.setItem("token", token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
        })
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('token');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}