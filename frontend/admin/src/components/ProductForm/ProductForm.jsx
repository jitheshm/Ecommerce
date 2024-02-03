/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ProductForm({title,method,api,id,btnName}) {
    const [productNameError, setProductNameError] = useState(false)
    const [brandError, setBrandError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [aboutError, setAboutError] = useState(false)
    const [warantyError, setWarantyError] = useState(false)
    const [productName, setProductName] = useState("")
    const [brand, setBrand] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [waranty, setWaranty] = useState(0)
    const [availableCategory, setAvailableCategory] = useState([])
    const navigate = useNavigate()

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

    useEffect(() => {
        if (id) {
            instance.get(`/admin/editproduct/${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data.data);
                setProductName(res.data.data.productName)
                setBrand(res.data.data.brand)
                setCategoryId(res.data.data.categoryId)
                setAboutProduct(res.data.data.aboutProduct)
                setWaranty(res.data.data.waranty)

            })
        }
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
        if (categoryId.trim() === "") {
            setCategoryError(true)
            return;
        } else {
            setCategoryError(false)
        }
        if (waranty < 0 || !/^[0-9]*\.?[0-9]+$/.test(waranty)) {
            setWarantyError(true)
            return;
        } else {
            setWarantyError(false)
        }
        if (aboutProduct.trim() === "") {
            setAboutError(true)
            return;
        } else {
            setAboutError(false)
        }
        console.log(categoryId);
        instance.request({
            method: method,
            url: api,
            data: {
                productName,
                brand,
                categoryId,
                isListed: true,
                aboutProduct,
                waranty,
                id

            },
            headers: {
                Authorization: Cookies.get('token')
            }

        }).then(() => {
            console.log("success");
            navigate('/products')

        })

    }
    return (
        <>

            <div className='pt-5'>
                <div className="col-11 m-auto mt-5 grid-margin">
                    <div className="card">
                        <div className="card-body mt-3">
                            <h4 className="card-title ">{title}</h4>
                            <form className="form-sample mt-5 ">

                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Product Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control text-white" value={productName} onChange={(e) => {
                                                    setProductNameError(false)
                                                    setProductName(e.target.value)
                                                }} />
                                                <div style={{ height: "30px" }}>
                                                    {productNameError && <p className='text-danger'>Product Name is required</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Brand</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control text-white" value={brand} onChange={(e) => {
                                                    setBrandError(false)
                                                    setBrand(e.target.value)

                                                }} />
                                                <div style={{ height: "30px" }}>
                                                    {brandError && <p className='text-danger'>Brand is required</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Category</label>
                                            <div className="col-sm-9">
                                                <select className="form-control text-white" value={categoryId} onChange={(e) => {
                                                    setCategoryError(false)
                                                    setCategoryId(e.target.value)
                                                }}>
                                                    <option value="">Select Category</option>
                                                    {
                                                        availableCategory.map((catObj) => {
                                                            return <option value={catObj._id}>{catObj.category}</option>
                                                        })
                                                    }

                                                </select>
                                                <div style={{ height: "30px" }}>
                                                    {categoryError && <p className='text-danger'>Category is required</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Waranty</label>
                                            <div className="col-sm-9">
                                                <input type="number" className="form-control text-white" value={waranty} min={0} onChange={(e) => {
                                                    setWaranty(e.target.value)
                                                    setWarantyError(false)
                                                }} />
                                                <div style={{ height: "30px" }}>
                                                    {warantyError && <p className='text-danger'>Waranty must be positive number or zero</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 mt-1'>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-12">
                                            <textarea className="form-control text-white" rows={4} style={{ height: "100px" }} value={aboutProduct} onChange={(e) => {
                                                setAboutError(false)
                                                setAboutProduct(e.target.value)
                                            }} />
                                            <div style={{ height: "30px" }}>

                                                {aboutError && <p className='text-danger'>Description is required</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type='button' className='btn-inverse-success mt-4' onClick={handleSubmit}>{btnName}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductForm