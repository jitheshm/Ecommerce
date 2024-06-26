/* eslint-disable react/jsx-key */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../../axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BASEURL } from "../../constants/constant"
import noImage from '../../../src/assets/No-Image-Placeholder.png'
import nowishlist from '../../../src/assets/wishlist (3).png'
import wishlist from '../../../src/assets/heart.png'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/user/userSlice'
import "./productDetails.css"

import InnerImageZoom from 'react-inner-image-zoom';
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

function ProductDetails() {
    const [product, setProduct] = useState([])
    const [showImg, setShowImg] = useState(0)
    // const [color, setColor] = useState('')
    const [colorList, setColorList] = useState([])
    const { productId, prodColor } = useParams()
    const [loading, setloading] = useState(true)
    const [cartStatus, setcartStatus] = useState(false)
    const [stockError, setStockError] = useState(false)
    const [wishlistStatus, setwishlistStatus] = useState(false)
    const [offers, setOffers] = useState([])
    const [discount, setDiscount] = useState(0)
    const [displayOff, setDisplayOff] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { verified } = useSelector((state) => state.user)
    useEffect(() => {
        console.log(prodColor);
        instance.get(`/user/products/${productId}/color/${prodColor}`).then((res) => {
            console.log(res.data.data);
            setProduct(res.data.data)
            return instance.get(`user/products/varients/${res.data.data[0]._id}/exist`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            })

        }).then((res) => {
            console.log(res.data,"ppp");
            if (res.data.success) {
                setcartStatus(true)

            } else {
                setcartStatus(false)
            }
            setloading(false)
        }).catch((error) => {
            console.log(error);
            setloading(false)
        })
    }, [prodColor])

    useEffect(() => {
        instance.get(`/user/products/${productId}/colors`).then((res) => {
            console.log(res.data.data);
            setColorList(res.data.data)
        })
    }, [])

    useEffect(() => {
        if (verified && product[0]) {
            console.log(product[0], "kk");
            instance.get(`/user/wishlist/${product[0]._id}/check`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data, "kk");
                if (res.data.success) {
                    setwishlistStatus(true)
                } else {
                    console.log("hai");
                    setwishlistStatus(false)
                }
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())
                }
            })
        }

    }, [product])

    useEffect(() => {
        if (product[0])
            instance.get(`user/offers/${product[0].productDetails[0].categoryId}/${product[0].productId}`).then((res) => {
                console.log(res.data.data);
                setOffers(res.data.data);
                // setDiscount(res.data.data.reduce((acc, curr) => {
                //     if (curr.offerType === 'amount') {
                //         return acc + curr.discount
                //     }
                //     else {
                //         return acc + (product[0].salePrice * curr.discount / 100)
                //     }
                // }, 0))

                // setDisplayOff(res.data.data.reduce((acc, curr) => {
                //     if (curr.offerType === 'amount') {
                //         return { amount: acc.amount + curr.discount, percentage: acc.percentage }
                //     } else {
                //         return { amount: acc.amount, percentage: acc.percentage + curr.discount }
                //     }
                // }, {
                //     amount: 0,
                //     percentage: 0
                // }))

            })

    }, [product])

    const handleColorChange = (e) => {
        navigate(`/product/${productId}/${e.target.value}`)
    }



    const handleImgChange = (no) => {
        setShowImg(no)
    }

    const handleAddToCart = () => {
        if (verified) {


            instance.patch('/user/cart', {
                productId: product[0]._id
            }, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setcartStatus(true)
                } else {
                    setStockError(true)

                }
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    Cookies.remove('token')
                    dispatch(logout())


                }

            })
        } else {
            navigate('/login')
        }
    }
    const handleWishList = () => {
        if (verified) {
            if (!wishlistStatus) {
                let productId=product[0]._id
                instance.patch(`/user/wishlist/${productId}/add`, {}, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        setwishlistStatus(true)
                    }
                }).catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        Cookies.remove('token')
                        dispatch(logout())
                    }
                }
                )
            } else {
                let productId=product[0]._id
                instance.delete(`/user/wishlist/${productId}/remove`, {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        setwishlistStatus(false)
                    }
                }).catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        Cookies.remove('token')
                        dispatch(logout())
                    }
                }
                )
            }

        } else {
            navigate('/login')
        }
    }

    return (
        <>
            {
                loading ? <div>loading...</div> :
                    <div style={{ backgroundColor: "white" }}>
                        <section className="py-5 ">
                            <div className="container">
                                <div className="row " style={{ position: "relative" }}>
                                    {

                                        wishlistStatus ?
                                            <div onClick={handleWishList} style={{ width: "40px", zIndex: 9, position: "absolute", top: 0, right: 0 }}>
                                                <img src={wishlist} alt="" style={{ width: "27px" }} />
                                            </div>
                                            :
                                            <div onClick={handleWishList} style={{ width: "40px", zIndex: 9, position: "absolute", top: 0, right: 0 }}>
                                                <img src={nowishlist} alt="" style={{ width: "27px" }} />
                                            </div>
                                    }

                                    <aside className="col-8 col-lg-4 m-auto mt-2">    

                                        <div className="border rounded-1 mb-3 py-4 d-flex justify-content-center align-items-center" style={{height:"300px"}}>
                                            {/* <ReactImageMagnify {...{
                                                smallImage: {
4

                                                    isFluidWidth: true,
                                                    src: `${product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage}`
                                                },
                                                largeImage: {
                                                    src: `${product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage}`,
                                                    width: 1200,
                                                    height: 1000,
                                                    isFluidWidth: false
                                                },
                                                shouldUsePositiveSpaceLens: true,

                                                style:{height:"100%"},
                                                enlargedImagePosition: "over",


                                            }} /> */}

                                            {/* <img style={{ maxWidth: '90%', height: '416px', margin: 'auto' }} className="rounded-4 fit " src={product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage} /> */}

                                            {/* <InnerImageZoom src={product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage} zoomSrc={product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage} 
                                                zoomPreload={false}
                                                zoomType='hover'
                                                moveType='drag'
                                                width={353}
                                                height={416}
                                            />  */}
                                            {/* <div style={{height:'300px'}}> */}

                                            <InnerImageZoom
                                                src={product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage}
                                                zoomSrc={product[0] ? BASEURL + "/" + product[0].imagesUrl[showImg] : noImage}
                                                fullscreenOnMobile={false}
                                                zoomScale={1.5}
                                               
                                               
                                                
                                                enlargeable={true}
                                                
                                            />
                                            {/* </div> */}
                                        </div>
                                        <div className="d-flex justify-content-center mb-3">
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(0)
                                            }}>
                                                <img width={40} height={50} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[0] : noImage} />
                                            </button>
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2 " target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(1)
                                            }} >
                                                <img width={40} height={50} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[1] : noImage} />
                                            </button>
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(2)
                                            }}>
                                                <img width={40} height={50} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[2] : noImage} />
                                            </button>
                                            <button data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => {
                                                handleImgChange(3)
                                            }}>
                                                <img width={40} height={50} className="rounded-2" src={product[0] ? BASEURL + "/" + product[0].imagesUrl[3] : noImage} />
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
                                                <h3><b className='me-2 '>₹{product[0].offerPrice ? product[0].offerPrice : product[0].salePrice}</b></h3>
                                                {
                                                    product[0].offerPrice && <p><s>₹{product[0].salePrice}</s></p>
                                                }
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
                                                        {
                                                            offers.map((offer) => {
                                                                return (
                                                                    <li>{offer.offerTitle}</li>
                                                                )
                                                            })
                                                        }
                                                        {/* <li>Bank Offer5% Cashback on Flipkart Axis Bank Card</li> */}

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
                                            <div style={{ height: "30px" }}>{stockError && <p style={{ color: "red" }}>Out of stock</p>}</div>
                                            <div className='d-flex justify-content-between col-9 col-md-5 mt-4'>
                                                
                                                {
                                                    cartStatus ? <Link to={'/cart'} className='btn text-white ' style={{ backgroundColor: "#1E1F29" }}>Go to cart</Link> : <button className='btn text-white ' style={{ backgroundColor: "#1E1F29" }} onClick={handleAddToCart}>Add to cart</button>
                                                }

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