import React,{useState}from 'react'
import {useDispatch,useSelector}from 'react-redux'
import registerUser from '../actions/authActions'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Register=({history}) =>{
    const[file,setFile]=useState(null)
    const [info, setInfo] = useState({
        firstName:'',
        lastName:'',
        Phone:'',
        Email:'',
        Password:'',
        
    })
    const [errors, seterrors] = useState(null)
    // function to handle the chages in the form
    const handleChange= e =>{
        setInfo({...info,[e.target.name]:e.target.value})
    }
    // function to dispatch the action of register to the state
    const dispatch=useDispatch();
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

    const registerNow=e=>{
        e.preventDefault()
        dispatch(registerUser(info))

        let formData = new FormData()
        formData.append("avatar",file)
        axios.post("/img",formData)
             .then(res=>console.log(res.data.imageName))
    }
    
    const selectImageToUpload=(e)=>{
        setFile(e.target.files[0])
        
    };

    return (

        <form onSubmit={registerNow}>
        <div>
            <label>Firstname</label>
            <input onFocus={()=>seterrors(null)} type='text' name='firstName' onChange={handleChange} />
        </div>
        <div>
            <label>Lastname</label>
            <input onFocus={()=>seterrors(null)} type='text' name='lastName' onChange={handleChange} />
        </div>
        <div>
            <label>Phone</label>
            <input onFocus={()=>seterrors(null)} type='text' name='Phone' onChange={handleChange} />
        </div>
        <div>
            <label>Email</label>
            <input onFocus={()=>seterrors(null)} type='text' name='Email' onChange={handleChange} />
        </div>
        <div>
            <label>Password</label>
            <input onFocus={()=>seterrors(null)} type="password" name='Password' onChange={handleChange}/>
        </div>
        <div>
            <label>Upload Image</label>
            <input type='file' name='avatar' onChange={selectImageToUpload} />
        </div>
        {errors && errors.map(el=><h1>{el.msg}</h1>)}
        <button type='submit'>Register</button>
        <Link to='/login'>Login</Link>
        </form>
        
    )
}

export default Register
