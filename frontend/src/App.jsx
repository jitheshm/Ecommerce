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
import Landing from './pages/User/Landing';
import Sidebar from './components/Admin/Sidebar/Sidebar';
import Layout from './components/Admin/Layout/Layout';



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
            path:"/",
            element:<Landing/>
        },
        {
            path:"/product/:productId/:varientId",
            element:<ProductDetails/>
        },
        {
            path:"/admin",
            element:<Layout/> 
        }
        
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )

}

export default App