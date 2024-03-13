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
import EditVarient from './pages/EditVarient';
import ViewProduct from './pages/ViewProduct';
import VarientList from './pages/VarientList';
import OrdersList from './components/OrdersList/OrdersList';
import ReturnList from './pages/ReturnList';
import AddCoupon from './pages/AddCoupon';
import ListCoupon from './pages/ListCoupon';
import CouponForm from './components/CouponForm/CouponForm';
import EditCoupon from './pages/EditCoupon';
import AddOffer from './pages/AddOffer';
import ListOffers from './pages/ListOffers';
import EditOffer from './pages/EditOffer';
import SalesReport from './pages/SalesReport';
import OrderDetails from './pages/OrderDetails';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import AddBanner from './pages/AddBanner';
import EditBanner from './pages/EditBanner';
import BannersList from './pages/BannersList';
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
    } else {
      setloading(false)
    }

  }, [])

  const router = createBrowserRouter([
    {
      path: "/addproduct",
      element: <Layout><AddProduct /></Layout>
    },
    {
      path: "/editproduct/:id",
      element: <Layout><EditProduct /></Layout>
    },
    {
      path: "/addvarient/:proId",
      element: <Layout><AddVarient /></Layout>
    },
    {
      path: "/editvarient/:id",
      element: <Layout><EditVarient /></Layout>
    },
    {
      path: "/products",
      element: <Layout><ListProducts /></Layout>
    },
    {
      path: "/users",
      element: <Layout><ListUsers /></Layout>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/addcategory",
      element: <Layout><AddCategory /></Layout>
    },
    {
      path: "/editcategory/:id",
      element: <Layout><EditCategory /></Layout>
    },
    {
      path: "/category",
      element: <Layout><CategoryList /></Layout>
    },
    {
      path: "/viewproduct/:id",
      element: <Layout><ViewProduct /></Layout>
    },
    {
      path: "/products/:id/varients",
      element: <Layout><VarientList /></Layout>
    },
    {
      path: "/orders",
      element: <Layout><OrdersList /></Layout>
    },
    {
      path: "/orders/orderdetails/:orderId/:productId",
      element: <Layout><OrderDetails /></Layout>
    },
    {
      path: "/returnorders",
      element: <Layout><ReturnList /></Layout>
    },
    {
      path: "/addcoupon",
      element: <Layout><AddCoupon /></Layout>
    },
    {
      path: "/coupons",
      element: <Layout><ListCoupon /></Layout>
    },
    {
      path: '/editcoupon/:id',
      element: <Layout><EditCoupon /></Layout>
    },
    {
      path: '/addoffer',
      element: <Layout><AddOffer /></Layout>
    },
    {
      path: '/offers',
      element: <Layout><ListOffers /></Layout>
    },
    {
      path: '/editoffer/:id',
      element: <Layout><EditOffer /></Layout>
    },
    {
      path: '/salesreport',
      element: <Layout><SalesReport /></Layout>
    },
    {
      path: "/",
      element: <Layout><Dashboard /></Layout>
    },
    {
      path:"/addbanner",
      element:<Layout><AddBanner/></Layout>
    },
    {
      path:"/editbanner/:id",
      element:<Layout><EditBanner/></Layout>
    },
    {
      path:"/banners",
      element:<Layout><BannersList/></Layout>
    },
    {
      path: "*",
      element: <PageNotFound />
    },



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