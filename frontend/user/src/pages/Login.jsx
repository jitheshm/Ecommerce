import React from 'react'
import Header from '../components/Header/Header'
import LoginComponent from '../components/Login/Login'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ForgetForm from '../components/ForgetForm/ForgetForm'
function Login() {

  const [loading, setloading] = useState(true)
  const [forget, setForget] = useState(false)
  const { name, verified } = useSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (verified) {
      navigate("/")
    } else {
      setloading(false)
    }
  }, [verified])

  return (
    <>
      <Header />
      {loading ? <div>loading...</div> : !forget && <LoginComponent setForget={setForget} />}
      {
        forget && <ForgetForm />    
      }
    </>
  )
}

export default Login