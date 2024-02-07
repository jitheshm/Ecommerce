/* eslint-disable react/jsx-key */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../../axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BASEURL } from "../../constants/constant.json"
import noImage from '../../../src/assets/No-Image-Placeholder.png'
import nowishlist from '../../../src/assets/wishlist (3).png'
import wishlist from '../../../src/assets/heart.png'
function ProductDetails() {
    const [product, setProduct] = useState([])
    const [showImg, setShowImg] = useState(0)
    // const [color, setColor] = useState('')
    const [colorList, setColorList] = useState([])
    const { productId, prodColor } = useParams()
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(prodColor);
        instance.get(`/user/getproductdetails/${prodColor}`).then((res) => {
            console.log(res.data.data);
            setProduct(res.data.data)
            setloading(false)
        })
    }, [prodColor])

    useEffect(() => {
        instance.get(`/user/getcolorlist/${productId}`).then((res) => {
            console.log(res.data.data);
            setColorList(res.data.data)
        })
    }, [])


    const handleColorChange = (e) => {
        navigate(`/product/${productId}/${e.target.value}`)
    }



    const handleImgChange = (no) => { 
        setShowImg(no)
    }

    return (
        <>
            {
                loading ? <div>loading...</div> :
                    <div style={{backgroundColor:"white"}}>
                        <section className="py-5 ">
                            <div className="container">
                                <div className="row " style={{ position: "relative" }}>
                                    <img src={wishlist} alt="" style={{ width: "40px", position: "absolute", top: 0, right: 0 }} />
                                    <aside className="col-11 col-lg-5 ">

                                        <div className="border rounded-1 mb-3 py-4 d-flex justify-content-center">

                                            <img style={{ maxWidth: '90%', height: '416px', margin: 'auto' }} className="rounded-4 fit " src={product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage} />

                                        </div>
                                        <div className="d-flex justify-content-center mb-3">
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(0)
                                            }}>
                                                <img width={40} height={60} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[0] : noImage} />
                                            </button>
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2 " target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(1)
                                            }} >
                                                <img width={40} height={60} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[1] : noImage} />
                                            </button>
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(2)
                                            }}>
                                                <img width={40} height={60} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[2] : noImage} />
                                            </button>
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(3)
                                            }}>
                                                <img width={40} height={60} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[3] : noImage} />
                                            </button>

                                        </div>
                                        {/* thumbs-wrap.// */}
                                        {/* gallery-wrap .end// */}

                                    </aside>
                                    <main className="col-lg-6">

                                        <div className="">
                                            <h4 className="title text-dark">
                                                {
                                                    product[0].productDetails[0].productName
                                                }

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
                                            <div className="mb-3 row align-items-center p-3">
                                                <h3><b className='me-2 '>₹{product[0].salePrice}</b></h3>
                                                <s className='d-flex' style={{ width: "fit-content" }}>₹{product[0].actualPrice} </s><b className='d-flex' style={{ color: "green", width: "fit-content" }}>20% OFF</b>

                                            </div>
                                            <hr style={{ borderColor: "black" }} />
                                            <div className="row px-4">
                                                <p>
                                                    {
                                                        product[0].productDetails[0].aboutProduct
                                                    }
                                                </p>

                                            </div>

                                            <hr style={{ borderColor: "black" }} />
                                            <div className="row px-4">
                                                <h5><b style={{ color: "black" }}>Available offers</b></h5>
                                                <p>
                                                    <ul>
                                                        <li>Bank Offer5% Cashback on Flipkart Axis Bank Card</li>
                                                        <li>Buy This Product and get ₹500 Off on Next AC Purchase</li>
                                                    </ul>
                                                </p>

                                            </div>
                                            <div className="row mb-4">
                                                <div className="col-md-4 col-6">
                                                    <label className="mb-2">Color</label>
                                                    <select className="form-select border border-secondary" style={{ height: 35 }} value={prodColor} onChange={handleColorChange}>
                                                        {
                                                            colorList.map((colorObj) => {
                                                                return (
                                                                    <option value={colorObj.color}>{colorObj.color}</option>
                                                                )

                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                {/* col.// */} 

                                            </div>
                                            <div className='d-flex justify-content-between col-9 col-md-5 mt-4'>
                                                <a className='btn text-white' style={{ backgroundColor: "#D10024" }}>Buy Now</a>
                                                <a className='btn text-white ' style={{ backgroundColor: "#1E1F29" }}>Add to cart</a>

                                            </div>
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </section>
                        {/* content */}

                    </div>
            }

        </>
    )
}

export default ProductDetails