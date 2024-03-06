import React, { useState } from 'react'
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
import Dashboard from './pages/Dashboard';
import Personal from './components/Personal/Personal';
import ManageAddress from './components/ManageAddress/ManageAddress';
import Wishlist from './components/Wishlist/Wishlist';
import Orders from './components/Orders/Orders';
import Cart from './pages/Cart';
import CheckOut from './components/CheckOut/CheckOut';
import Checkout from './pages/Checkout';
import Auth from './components/Auth/Auth';
import OrderDetails from './components/OrderDetails/OrderDetails';
import SearchResults from './components/SearchResults/SearchResults';
import SearchResult from './pages/SearchResult';
import Wallet from './pages/Wallet';
import Account from './components/mobile/Account';
import Repayment from './pages/Repayment';


function App() {
    const [loading, setloading] = useState(true)
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
            path: "/product/:productId/:prodColor",
            element: <ProductDetails />
        },
        {
            path: "/profile",
            element: <Auth><Dashboard /></Auth>,
            children: [
                {
                    path: "",
                    element: <Account />,
                },
                {
                    path: "personal",
                    element: <Personal />,
                },
                {
                    path: "address",
                    element: <ManageAddress />,
                },
                {
                    path: "orders",
                    element: <Orders />,
                },
                {
                    path: "orders/:orderId/:productId",
                    element: <OrderDetails />
                },
                {
                    path: "wishlist",
                    element: <Wishlist />,
                },
                {
                    path: 'wallet',
                    element: <Wallet />
                }
            ],
        },
        {
            path: "/cart",
            element: <Auth><Cart /></Auth>
        },
        {
            path: "/checkout",
            element: <Auth><Checkout /></Auth>
        },
        {
            path: "/search/:searchQuery",
            element: <SearchResult />
        },
        {
            path: "/order/repayment/:orderId",
            element: <Repayment />
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