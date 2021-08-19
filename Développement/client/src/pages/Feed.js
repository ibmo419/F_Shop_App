import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {loadUser} from "../actions/authActions"

const Feed=() => {

    const dispatch=useDispatch()
    useEffect(()=>{
    dispatch(loadUser())
    },[])
const auth=useSelector(state=>state.auth)

    return (
        <div>
            Feed Page
            {auth.user && <p> Hello {auth.user.firstName}</p>}
        </div>
    )
}

export default Feed
