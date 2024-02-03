import React, { useLayoutEffect, useState } from 'react'
import Layout from './components/Layout/Layout'
import './App.css'
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
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import CategoryList from './components/CategoryList/CategoryList';
function App() {
  const [loading, setloading] = useState(true)
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
                setloading(false)
            }).catch((err) => {
                console.log(err);
                setloading(false)
            })
        }else{
          setloading(false)
        }

    }, [])

  const router = createBrowserRouter([
    {
      path: "/addproduct",
      element: <Layout></Layout>
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
    },
    {
      path:"/addcategory",
      element:<Layout><AddCategory/></Layout>
    },
    {
      path:"/editcategory/:id",
      element:<Layout><EditCategory/></Layout>
    },
    {
      path:"/category",
      element:<Layout><CategoryList/></Layout>
    }


  ])
  return (

    <>   
   
      {
        loading ? <h1>Loading...</h1> : <RouterProvider router={router} />
      }
    
    </>
  )
}

export default App