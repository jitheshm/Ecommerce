import React from 'react'
import ProductForm from '../components/ProductForm/ProductForm'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../axios'   

function AddProduct() {
   
    return (
        <ProductForm title="Enter product details" method="post" api="/admin/addproduct" btnName="Add product" />
    )
}

export default AddProduct