import React from 'react'
import './App.css'
import './assets/bootstrap.min.css'
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Landing from './pages/Landing';
import { store } from './store/store'
import { Provider, useDispatch } from 'react-redux'
import { useLayoutEffect } from 'react';
import Cookies from 'js-cookie';
import instance from './axios';
import { verify } from './features/user/userSlice';
import Profile from './pages/Profile';

function App() {
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            instance.get('/user/tokenverify', {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                dispatch(verify({ name: res.data.name }))
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [])
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/",
            element: <Landing />
        },
        {
            path: "/product/:productId/:varientId",
            element: <ProductDetails />
        },
        {
            path:"/profile",
            element:<Profile />
        }


    ])
    return (
        <>

            <RouterProvider router={router} />

        </>
    )

}

export default App