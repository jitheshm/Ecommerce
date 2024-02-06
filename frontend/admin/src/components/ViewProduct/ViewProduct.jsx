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


    const [varients, setVarients] = useState([])
    const [search, setSearch] = useState('')

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

    useEffect(() => {
        instance.get(`/admin/getallvarient/${id}`, {
            headers: {
                Authorization: Cookies.get('token')
            }
        }).then((res) => {
            console.log(res.data.data);
            setVarients(res.data.data)
        })
    }, [])


    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            instance.delete(`/admin/deletevarient?id=${id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res);
                setVarients(varients.filter((varientObj) => varientObj._id !== id))
            })
        }

    }


    const handleSearch = (e) => {
        setSearch(e.target.value)

    }

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


                        <div className="card-body">
                            <div className='row align-items-center mb-4'>
                                <h4 className="card-title col-4 mt-4"><b>All Varients</b></h4>
                                <form className="nav-link  d-none d-lg-flex search col-6">
                                    <input type="text" className="form-control" placeholder="Search products" style={{ color: "white" }} onChange={handleSearch} />
                                </form>
                            </div>


                            <div className="table-responsive col-12">
                                <table className="table" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>VID</th>
                                            <th>Stock</th>
                                            <th>Actual price</th>
                                            <th>Sale Price</th>
                                            <th>Color</th>

                                            <th style={{ textAlign: "center", width: "250px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            varients.map((varientObj) => {
                                                if (varientObj.color.startsWith(search) || search === "") {
                                                    return (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <tr >
                                                            <td style={{ color: "#6c7293" }}>{varientObj._id}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.stock}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.actualPrice}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.salePrice}</td>
                                                            <td style={{ color: "#6c7293" }}>{varientObj.color}</td>

                                                            <td className='d-flex gap-3 justify-content-center' style={{ width: "250px" }}>
                                                                <Link to={`/editvarient/${varientObj._id}`} className='btn btn-outline-warning'>Edit</Link>


                                                                <button className='btn btn-outline-danger' onClick={() => {
                                                                    handleDelete(varientObj._id)
                                                                }}>Delete</button>


                                                            </td>
                                                        </tr>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default ViewProduct