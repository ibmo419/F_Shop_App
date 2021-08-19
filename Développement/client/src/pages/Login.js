import React from 'react'
import {useState,useEffect} from 'react'
import { loginUser } from '../actions/authActions'
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom'

const Login=({history}) => {
    const [info, setInfo] = useState([{
        Email:'',
        Password:''}
    ])
    const [errors, seterrors] = useState(null)
    
    const handleChange= e =>{
        setInfo({...info,[e.target.name]:e.target.value})
    }
    const dispatch=useDispatch()
    const login=e=>{
        e.preventDefault()
        dispatch(loginUser(info))

    }
    const auth=useSelector((state)=>state.auth);

    useEffect(()=>{
        if(auth.isAuth){
            history.push("/feed");
        }
        if(auth.error){
           seterrors(auth.error);
           setTimeout(()=>{
            seterrors(null);
        },5000)
        }
    },[auth.isAuth,auth.error])

    return (
        <form onSubmit={login}>
        <div>
            <label>Email</label>
            <input onFocus={()=>seterrors(null)}  type='text' name='Email' onChange={handleChange} />
        </div>
        <div>
            <label>Password</label>
            <input onFocus={()=>seterrors(null)}  type='password' name='Password' onChange={handleChange}/>
        </div>
        {errors && errors.map(el=><h1>{el.msg}</h1>)}
        <button type='submit'>Login</button>
        <Link to='/register'>Register</Link>
        </form>
    )
}

export default Login
