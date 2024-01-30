import React from 'react'
import ProductForm from '../components/ProductForm/ProductForm'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../axios'   

function AddProduct() {
    const [productName, setProductName] = useState("")
    const [brand, setBrand] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [isListed, setIsListed] = useState(true)
    const [waranty, setWaranty] = useState(0)
    const [availableCategory, setAvailableCategory] = useState([])
   


    

    
    const props={
        productName,
        setProductName,
        brand,
        setBrand,
        categoryId,
        setCategoryId,
        aboutProduct,
        setAboutProduct,
        isListed,
        setIsListed,
        waranty,
        setWaranty,
        availableCategory,
        setAvailableCategory,
        method:'post',
        api:'/admin/addproduct'
    }
    return (
        <ProductForm {...props} title="Enter product details" btnName="Add product"/>
    )
}

export default AddProduct