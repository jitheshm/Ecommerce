import React from 'react'
import './App.css'
import './assets/bootstrap.min.css'
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
  } from "react-router-dom";
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import ProductDetails from './pages/User/ProductDetails';



function App() {
    const router=createBrowserRouter([
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/product/:productId/:varientId",
            element:<ProductDetails/>
        }
        
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )

}

export default App