import React from 'react'
import Layout from './components/Layout/Layout'

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate, 
} from "react-router-dom";
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import AddVarient from './pages/AddVarient';
function App() {
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
    }


  ])
  return (

    <RouterProvider router={router} />
  )
}

export default App