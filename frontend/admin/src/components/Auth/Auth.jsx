import React from 'react'
import { useEffect, useState } from "react";



import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom';
function Auth({ children }) {
    const [loading, setloading] = useState(true)
    const { verified } = useSelector((state) => state.admin)
    
    const navigate=useNavigate()
    useEffect(() => {
        
        if (verified) {
            setloading(false)
        }else{
            navigate("/login")
        }
    }, [verified])
    
    return (
        <>
            {
                loading ? <div><p>loading</p></div> : children
            }
        </>
    )
}

export default Auth