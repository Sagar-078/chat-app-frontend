import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRout = ({children}) => {

    const {token} = useSelector((state) => state.auth);
    // console.log("token at private route =>>", token);

    if(token === null || token === undefined){
        return <Navigate to="/"/>
    }else{
        return children
    }
}

export default PrivateRout