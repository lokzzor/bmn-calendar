import{ LOGOUT, SET_USER, LOGIN_FAIL, REGISTER_FAIL, AUTH_ERROR} from '../Constants/Constants';

const defaultState = {
    currentUser: { loginName:'Guest',personName:'Guest' },
    isAuth: false,
    errors: {}
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                errors:{}
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                errors: action.payload,
                isAuth: false
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: { loginName:'Guest',personName:'Guest' },
                isAuth: false
            }
        default:
            return state
    }
}

export const registerFail = (errors) => ({type: REGISTER_FAIL, payload: errors}) // пометка)
export const loginFail = (errors) => ({type: LOGIN_FAIL, payload: errors}) // пометка)
export const setUser = user => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOGOUT})