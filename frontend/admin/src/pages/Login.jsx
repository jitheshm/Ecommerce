import React, { useEffect, useState } from 'react'
import LoginComponent from '../components/Login/Login'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [loading, setloading] = useState(true)
  const { verified } = useSelector((state) => state.admin)
  const navigate = useNavigate()

  useEffect(() => {
    if (verified) {
      navigate("/products")
    } else {
      setloading(false)
    }
  }, [verified])
  return (
    <>
    {
      loading?<div>loading...</div> :<LoginComponent/>
    }
    </>
  )
}

export default Login