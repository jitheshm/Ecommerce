import React from 'react'
import './App.css'
import './assets/bootstrap.min.css'
import Header from './components/User/Header/Header'
import Login from './components/User/Login/Login'
import Signup from './components/User/Signup/Signup'



function App() {
    return (
        <>
            <Header />
            {/* <Login/> */}
            <Signup/>
        </>
    )

}

export default App