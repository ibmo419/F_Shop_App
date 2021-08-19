import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import { logoutUser } from './actions/authActions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faBars} from "@fortawesome/free-solid-svg-icons"


const Navbar=() =>{
    const auth=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    return (
        <div>
            
            { 
            auth.isAuth ?
            (
            <div>
                <ul>
                    <li>
                    <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                    <Link onClick={()=>dispatch(logoutUser())}>Log Out</Link>
                    </li>
                </ul>
            </div>
            ):
            (
            <nav>
                 <div>
                <ul>
                    <li>
                    <Link to='/register'>Register</Link>
                    </li>
                    <li>
                    <Link to='/login'>Login</Link>
                    </li>
                    <li>
                    <Link to='/'>Home</Link>
                    </li>
                    <li>
                    <Link to='/ContactUs'>Contact</Link>
                    </li>
                </ul>
            </div>
            </nav>
           
            )
            }
        </div>
    )
};

export default Navbar
