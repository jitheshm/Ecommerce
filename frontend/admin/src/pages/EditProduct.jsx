import React from 'react'
import ProductForm from '../components/ProductForm/ProductForm'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../axios'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
function EditProduct() {
    const [productName, setProductName] = useState("")
    const [brand, setBrand] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [isListed, setIsListed] = useState(true)
    const [waranty, setWaranty] = useState(0)
    const [availableCategory, setAvailableCategory] = useState([])
    const {id} = useParams()

   



    const props = {
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
        api: '/admin/updateproduct',
        method:'patch',
        id
    }
    return (
        <ProductForm {...props} title="Edit product details" btnName="Update Product" />
    )
}

export default EditProduct