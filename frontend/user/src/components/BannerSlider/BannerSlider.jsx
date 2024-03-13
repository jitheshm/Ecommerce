/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'

import instance from '../../axios';
import { BASEURL } from "../../constants/constant.json"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './bannerslide.css'
function BannerSlider() {
    const [banners, setBanners] = useState([])
    useEffect(() => {
        instance.get('/user/banners').then((res) => {
            console.log(res.data.data);
            setBanners(res.data.data)
        })
    }, [])
    return (
        <div style={{padding:'40px 0',display:'flex',justifyContent:'center',alignItems:'center'}}>

        <Carousel showStatus={false} showThumbs={false}>
            {
                banners.map((banner) => {
                    return (  
                            <img src={BASEURL + "/" + banner.imagesUrl[0]} className='carousal_sugu' />
                    )
                })
            }


        </Carousel>
        </div>
    )


}

export default BannerSlider