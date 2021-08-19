import {REGISTER_SUCESS,
    REGISTER_FAIL,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCESS,
    LOAD_USER_FAIL,
    LOGOUT
} from './types'
import axios from 'axios'
import setToken from '../setToken'

// dispatch :pour assurer l'asynchronization de la fonction
const registerUser=(info)=>dispatch=>{
axios.post("/register",info)
    .then(res=>dispatch({
        type:REGISTER_SUCESS,
        payload:res.data,
    }))
    .catch(err=>dispatch({
        type:REGISTER_FAIL,
        payload:err.response.data.errors
    }))
};
export default registerUser

export const loadUser=()=>dispatch=>{
    setToken();
    axios.get('/login')
         .then(res=>dispatch({
             type:LOAD_USER_SUCESS,
             payload:res.data
         }))
         .catch(err=>dispatch({
             type:LOAD_USER_FAIL,
             payload:err.response.data.errors
         }))
};
export const loginUser=(data)=>(dispatch)=>{
axios.post('/login',data)
     .then(res=>
         {dispatch({
             type:LOGIN_SUCESS,
             payload:res.data
         })
         console.log(res.data)
    }
     )
     .catch(error=>
        {dispatch({
         type:LOGIN_FAIL,
         payload:error.response.data.errors
     })
    console.log(error.response.data.errors)}
     )
}

export const logoutUser=()=>(dispatch)=>{
    dispatch({
        type:LOGOUT
    })
}