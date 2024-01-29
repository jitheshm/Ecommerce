import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../../axios'
import { useParams } from 'react-router-dom'
import { BASEURL } from "../../constants/constant.json"
import noImage from '../../../src/assets/No-Image-Placeholder.png'
function ProductDetails() {
    const [product, setProduct] = useState([])
    const {productId,varientId}=useParams()
    useEffect(() => {
     instance.get(`/user/getproductdetails/${varientId}`).then((res)=>{
        console.log(res.data.data);
        setProduct(res.data.data)   

     })
    }, [])
    
    return (
        <>
            <div>
                <section className="py-5 mt-5">
                    <div className="container">
                        <div className="row gx-5">
                            <aside className="col-lg-6">
                                <div className="border rounded-4 mb-3 d-flex justify-content-center">

                                    <img style={{ maxWidth: '100%', maxHeight: '70vh', margin: 'auto' }} className="rounded-4 fit" src={product[0]?BASEURL + "/" + product[0].imagesUrl[0]:noImage} />

                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" >
                                        <img width={60} height={60} className="rounded-2" src={product[0]?BASEURL + "/" + product[0].imagesUrl[1]:noImage} />
                                    </a>
                                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" >
                                        <img width={60} height={60} className="rounded-2" src={product[0]?BASEURL + "/" + product[0].imagesUrl[2]:noImage} />
                                    </a>
                                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" >
                                        <img width={60} height={60} className="rounded-2" src={product[0]?BASEURL + "/" + product[0].imagesUrl[3]:noImage} />
                                    </a>
                                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" >
                                        <img width={60} height={60} className="rounded-2" src={product[0]?BASEURL + "/" + product[0].imagesUrl[4]:noImage} />
                                    </a>
                                    
                                </div>
                                {/* thumbs-wrap.// */}
                                {/* gallery-wrap .end// */}
                            </aside>
                            <main className="col-lg-6">
                                <div className="ps-lg-3">
                                    <h4 className="title text-dark">
                                        vivo T2 Pro 5G (Dune Gold, 128 GB)  (8 GB RAM)

                                    </h4>
                                    <div className="d-flex flex-row my-3">
                                        <div className="text-warning mb-1 me-2">
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fas fa-star-half-alt" />
                                            <span className="ms-1">
                                                4.5
                                            </span>
                                        </div>

                                    </div>
                                    <div className="mb-3">
                                        <h3><b>₹23,999</b></h3>

                                    </div>
                                    <hr style={{ borderColor: "black" }} />
                                    <div className="row px-4">
                                        <ul style={{ listStyle: "disc" }}>
                                            <li>8 GB RAM | 128 GB ROM</li>
                                            <li>17.22 cm (6.78 inch) Full HD+ Display</li>
                                            <li>64MP + 2MP | 16MP Front Camera</li>
                                            <li>4600 mAh Battery</li>
                                            <li>Dimensity 7200 Processor</li>
                                        </ul>
                                    </div>
                                    <hr style={{ borderColor: "black" }} />
                                    <div className="row mb-4">
                                        <div className="col-md-4 col-6">
                                            <label className="mb-2">Color</label>
                                            <select className="form-select border border-secondary" style={{ height: 35 }}>
                                                <option>RED</option>
                                                <option>GREEN</option>
                                                <option>ORANGE</option>
                                            </select>
                                        </div>
                                        {/* col.// */}
                                        <div className="col-md-4 col-6 mb-3">
                                            <label className="mb-2 d-block">Quantity</label>
                                            <div className=" mb-3" >
                                                <div className="input-group">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger  btn-number" data-type="minus" data-field>
                                                            <span className="glyphicon glyphicon-minus" />
                                                        </button>
                                                    </span>
                                                    <input type="text" id="quantity" name="quantity" className="form-control input-number" defaultValue={10} min={1} max={100} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field>
                                                            <span className="glyphicon glyphicon-plus" />
                                                        </button>
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between col-9 col-md-5'>
                                        <a className='btn btn-danger'>Buy Now</a>
                                        <a className='btn btn-primary'>Add to cart</a>

                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </section>
                {/* content */}

            </div>

        </>
    )
}

export default ProductDetails