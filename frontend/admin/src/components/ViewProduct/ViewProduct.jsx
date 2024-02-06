import React from 'react'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
function ViewProduct() {
    const [productName, setProductName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [aboutProduct, setAboutProduct] = useState("")
    const [waranty, setWaranty] = useState(0)
    const { id } = useParams()


   

    useEffect(() => {

        instance.get(`/admin/product/${id}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            setProductName(res.data.data.productName)
            setBrand(res.data.data.brand)
            setCategory(res.data.data.categoryName[0].category)
            setAboutProduct(res.data.data.aboutProduct)
            setWaranty(res.data.data.waranty)

        })

    }, [])

    

    return (
        <>

            <div className='pt-5'>
                <div className="col-11 m-auto mt-5 grid-margin">  
                    <div className="card">
                        <div className="card-body mt-3"> 
                            <div className='row justify-content-end'>
                                <Link to={`/editproduct/${id}`} className="btn btn-outline-warning mt-4" style={{width:"120px"}}>Edit Details</Link>
                            </div>
                            <h4 className="card-title ">Product Details</h4>

                            <form className="form-sample mt-5 ">

                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Product Name</label>
                                            <div className="col-sm-9">
                                                <div className="form-control text-white"  >
                                                    {productName}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Brand</label>
                                            <div className="col-sm-9">
                                                <div className="form-control text-white"  >
                                                    {brand}
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
                                                <div className="form-control text-white"  >
                                                    {category}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Waranty</label>
                                            <div className="col-sm-9">
                                                <div className="form-control text-white" >
                                                    {waranty}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 mt-1'>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Description</label>   
                                        <div className="col-sm-12">
                                            <div className="form-control text-white" style={{ height: "150px", lineHeight: "25px" }}  >
                                                {aboutProduct}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>


                        

                    </div>
                </div>
            </div>


        </>
    )
}

export default ViewProduct