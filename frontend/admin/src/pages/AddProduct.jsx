import React from 'react'
import ProductForm from '../components/ProductForm/ProductForm'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../axios'
import Cookies from 'js-cookie';
function AddProduct() {
    const [productName, setProductName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [isListed, setIsListed] = useState(true)
    const [waranty, setWaranty] = useState(0)
    const [availableCategory, setAvailableCategory] = useState([])
    const [productNameError, setProductNameError] = useState(false)
    const [brandError, setBrandError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [aboutError, setAboutError] = useState(false)


    useEffect(() => {
        instance.get('/admin/getcategories', {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res);
            setAvailableCategory(res.data.data)
        })
    }, [])

    const handleSubmit = () => {
        if (productName.trim() === "") {
            setProductNameError(true)
            return;
        } else {
            setProductNameError(false)
        }
        if (brand.trim() === "") {
            setBrandError(true)
            return;
        } else {
            setBrandError(false)
        }
        if (category.trim() === "") {
            setCategoryError(true)
            return;
        } else {
            setCategoryError(false)
        }
        if (aboutProduct.trim() === "") {
            setAboutError(true)
            return;
        } else {
            setAboutError(false)
        }
        instance.post('admin/addproduct', {
            productName,
            brand,
            category,
            isListed,
            aboutProduct,
            waranty
        }, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then(() => {
            console.log("success");

        })

    }
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
        handleSubmit,
        productNameError,
        brandError,
        categoryError,
        aboutError,
        setBrandError,
        setProductNameError,
        setCategoryError,
        setAboutError
    }
    return (
        <ProductForm {...props}/>
    )
}

export default AddProduct