import React from 'react'
import ProductForm from '../components/ProductForm/ProductForm'
import { useEffect } from 'react'
import { useState } from 'react'

function EditProduct() {
    const [productName, setProductName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [isListed, setIsListed] = useState(true)
    const [waranty, setWaranty] = useState(0)
    const [availableCategory, setAvailableCategory] = useState([])
   

    

   
    const props={
        productName,
        setProductName,
        brand,
        setBrand,
        category,
        setCategory,
        aboutProduct,
        setAboutProduct,
        isListed,
        setIsListed,
        waranty,
        setWaranty,
        availableCategory,
        setAvailableCategory,
        
    }
    return (
        <ProductForm {...props}/>
    )
}

export default EditProduct