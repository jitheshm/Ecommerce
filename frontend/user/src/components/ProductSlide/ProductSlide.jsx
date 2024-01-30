import React from 'react'
import './ProductSlide.css'
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from 'react'
import instance from '../../axios'
import { useState } from 'react'

function ProductSlide({ title }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        instance.get('/user/getproducts').then((res) => {
            console.log(res);
            setProducts(res.data.data)
        })
    }, [])

    return (
        <>
            <div className='container-fluid mb-5 '> 
                <div className='ms-4'>
                    <h3><b style={{color:"black"}}>Flash sale</b></h3>
                    <hr style={{borderColor:"black"}} />
                </div>
                <div className=' m-md-5 d-flex gap-md-5 ms-4 slidebar '>
                    
                    <div className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                        <div className='p-3'>
                            <img className="card-img-top" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70&crop=false" alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title "><b>Realme 9 pro plus</b></h5>
                            
                            <p className="card-text mt-2"><b>₹ 19,999</b> <b style={{color:"green"}}>20% OFF</b></p>
                        </div>
                    </div> 
                    <div className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                        <div className='p-3'>
                            <img className="card-img-top" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70&crop=false" alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title "><b>Realme 9 pro plus</b></h5>
                            
                            <p className="card-text mt-2"><b>₹ 19,999</b> <b style={{color:"green"}}>20% OFF</b></p>
                        </div>
                    </div> 
                    <div className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                        <div className='p-3'>
                            <img className="card-img-top" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70&crop=false" alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title "><b>Realme 9 pro plus</b></h5>
                            
                            <p className="card-text mt-2"><b>₹ 19,999</b> <b style={{color:"green"}}>20% OFF</b></p>
                        </div>
                    </div> 
                    <div className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                        <div className='p-3'>
                            <img className="card-img-top" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70&crop=false" alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title "><b>Realme 9 pro plus</b></h5>
                            
                            <p className="card-text mt-2"><b>₹ 19,999</b> <b style={{color:"green"}}>20% OFF</b></p>
                        </div>
                    </div> 
                    <div className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                        <div className='p-3'>
                            <img className="card-img-top" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70&crop=false" alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title "><b>Realme 9 pro plus</b></h5>
                            
                            <p className="card-text mt-2"><b>₹ 19,999</b> <b style={{color:"green"}}>20% OFF</b></p>
                        </div>
                    </div> 
                    <div className="card col-5 col-md-2 mt-5 mt-md-0 mx-2" >
                        <div className='p-3'>
                            <img className="card-img-top" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70&crop=false" alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title "><b>Realme 9 pro plus</b></h5>
                            
                            <p className="card-text mt-2"><b>₹ 19,999</b> <b style={{color:"green"}}>20% OFF</b></p>
                        </div>
                    </div> 
                     
                    
                    
                    
                    
                </div>
            </div>


        </>

    )
}

export default ProductSlide