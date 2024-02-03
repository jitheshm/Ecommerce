import React from 'react'
import AddProductForm from '../components/ProductForm/AddProductForm'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../axios'   

function AddProduct() {
   
    return (
        <AddProductForm />
    )
}

export default AddProduct