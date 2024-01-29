import React, { useEffect } from 'react'
import { useState } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
function ProductForm() {
    const [productName, setProductName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [waranty, setWaranty] = useState(0)
    const [availableCategory, setAvailableCategory] = useState([])
    const [productNameError, setProductNameError] = useState(false)
    const [brandError, setBrandError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [aboutError, setAboutError] = useState(false)
    const [warantyError, setWarantyError] = useState(false)

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
            setProductNameError(true)
        }
        if (brand.trim() === "") {
            setBrandError(true)
            return;
        } else {
            setBrandError(true)
        }
        if (category.trim() === "") {
            setCategoryError(true)
            return;
        } else {
            setCategoryError(true)
        }
        if (aboutProduct.trim() === "") {
            setAboutError(true)
            return;
        } else {
            setAboutError(true)
        }
        instance.post('admin/addproduct',{
            productName,
            brand,
            category,
            aboutProduct,
            waranty
        } ,{
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then(()=>{
            console.log("success");
        
        })

    }

    return (
        <>

            <form className='container-fluid mt-5 p-5 col-8 text-white'>
                {/* 2 column grid layout with text inputs for the first and last names */}
                <h3 className='mb-5 text-center'>Enter product details</h3>
                <div className="row mb-4">
                    <div className="col ">
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="form6Example1">Product name</label>
                            <input type="text" id="form6Example1" className="form-control" value={productName} onChange={(e) => {
                                setProductName(e.target.value)
                            }} />

                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Brand name</label>
                            <input type="text" id="form6Example2" className="form-control" value={brand} onChange={(e) => {
                                setBrand(e.target.value)
                            }} />

                        </div>
                    </div>
                </div>
                {/* Text input */}
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Category</label>
                    <select className="form-select" aria-label="Default select example" value={category} onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        <option value="" selected>Select Category</option>
                        {
                            availableCategory.map((category) => {
                                return (
                                    <option value={category._id}>{category.category}</option>
                                )

                            })
                        }



                    </select>


                </div>
                {/* Text input */}



                {/* Message input */}
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example7">Description</label>
                    <textarea className="form-control" id="form6Example7" rows={4} value={aboutProduct} onChange={(e) => {
                        setAboutProduct(e.target.value)
                    }} />

                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Waranty</label>
                    <input type="number" id="form6Example3" className="form-control" value={waranty} onChange={(e) => {
                        setWaranty(e.target.value)
                    }} />

                </div>
                {/* Submit button */}
                <button data-mdb-ripple-init type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Add product </button>
            </form>

        </>
    )
}

export default ProductForm