import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function auth({ children }) {
    const [loading, setloading] = useState(true)
    const { name, verified } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (verified) {
            setloading(false)
        } else {
            navigate("/login")
        }
    }, [verified])

    return (
        loading ? <div>loading...</div> : { children }
    )
}

export default auth