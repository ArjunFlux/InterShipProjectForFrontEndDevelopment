import React from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
function CheckAutehnication({children}){
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login')
        }
    },[navigate])
    return(
        children
    )
}

export default CheckAutehnication;