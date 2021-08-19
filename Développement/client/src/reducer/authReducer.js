
import {REGISTER_SUCESS,
    REGISTER_FAIL,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCESS,
    LOAD_USER_FAIL,
    LOGOUT
} from '../actions/types'

let initialState={
    token:localStorage.getItem('token'),
    user:null,
    isAuth:false,
    error:null
}
const AuthReducer=(state=initialState , action) => {
switch (action.type)  {
    // en cas de succée de register
    case LOGIN_SUCESS:
    case REGISTER_SUCESS:
        // add the token in the local storage
        localStorage.setItem('token',action.payload.token)
        return {
            ...state,
            token:action.payload.token,
            isAuth:true,
            error:null
        }
    // en cas de echec de register
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
    case REGISTER_FAIL:
        // add the token in the local storage
        localStorage.removeItem('token')
        return {
            ...state,
            isAuth:false,
            error:action.payload
        }
        
    // en cas de succée de Load
    case LOAD_USER_SUCESS:
        return {
            ...state,
            user:action.payload,
            error:null,
        }
    case LOGOUT:
        localStorage.removeItem('token')
        return {
            isAuth:false,
            error:null,
            user:null
        }

    default:
        return state
}
}
export default AuthReducer