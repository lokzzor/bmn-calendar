import { setUser, loginFail } from "../Reducers/userReducer";
import { successAddEvent, eventFail } from "../Reducers/otherReducer";

import API from '../Reducers/API';

export const registration = (state) => {
    return async dispatch => {
        try {
            await API.post('api/auth/createuser', { state });
            dispatch(successAddEvent('Success'))
            setTimeout(function () { dispatch(successAddEvent('')) }, 2500)
        } catch (error) {
            //console.log(error.response.data.message)
            dispatch(eventFail(error.response.data.message));
            setTimeout(function () { dispatch(eventFail('')) }, 2500)
            //dispatch(loginFail(error.response.data.message))
            //console.log(error.response.data.message)
        }
    }
}

export const login = (login, password) => {
    return async dispatch => {
        try {
            const response = await API.post('api/auth/login', { login, password });
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            dispatch(loginFail(error.response.data.message))
            //dispatch(loginFail(error.response.data.message))
            //console.log(error.response.data.message)
        }
    }
}
export const auth =  () => {
    return async dispatch => {
        try {
            //await API.get('api/auth/firststart');
            const response = await API.get('api/auth/updateauth', 
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch(e) {
            /* console.log(e);  */
        }
    }
}
export const changepassword = (state) => {
    return async dispatch => {
        try {
            await API.post('api/auth/updatepassword', { state });
            dispatch(successAddEvent('Success'))
            setTimeout(function () { dispatch(successAddEvent('')) }, 2500)
        } catch(error) {
            dispatch(eventFail(error.response.data.message));
            setTimeout(function () { dispatch(eventFail('')) }, 2500)
            //dispatch(loginFail(error.response.data.message))
            //console.log(error.response.data.message)
        }
    }
}