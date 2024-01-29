import React from 'react'
import Layout from './components/Layout/Layout'

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import AddProduct from './pages/AddProduct';
function App() {
  const router = createBrowserRouter([
    {
      path: "/addproduct",
      element: <Layout><AddProduct/></Layout>
    }


  ])
  return (

    <RouterProvider router={router} />
  )
}

export default App