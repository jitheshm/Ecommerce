import React, { useLayoutEffect } from 'react'
import Layout from './components/Layout/Layout'

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate, 
} from "react-router-dom";
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import AddVarient from './pages/AddVarient';
import ListProducts from './pages/ListProducts';
import ListUsers from './pages/ListUsers';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import instance from './axios';
import { verify } from './features/admin/adminSlice';
import Cookies from 'js-cookie';
function App() {

  const dispatch = useDispatch()
    useLayoutEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            instance.get('/admin/tokenverify', {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                dispatch(verify())
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [])

  const router = createBrowserRouter([
    {
      path: "/addproduct",
      element: <Layout><AddProduct/></Layout>
    },
    {
      path: "/editproduct/:id",
      element: <Layout><EditProduct/></Layout>
    },
    {
      path: "/addvarient/:proId",
      element: <Layout><AddVarient/></Layout>
    },
    {
      path: "/products",
      element: <Layout><ListProducts/></Layout>
    },
    {
      path: "/users",
      element: <Layout><ListUsers/></Layout>
    },
    {
      path:"/login",
      element:<Login/>
    }


  ])
  return (

    <RouterProvider router={router} />
  )
}

export default App