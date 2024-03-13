import React from 'react'
import Header from '../components/Header/Header'
import ProductSlide from '../components/ProductSlide/ProductSlide'
import MobileNavbar from '../components/mobile/Navbar'
import CategorySlide from '../components/CategorySlide/CategorySlide'
import BannerSlider from '../components/BannerSlider/BannerSlider'
function Landing() {
  return (
    <>
      <Header />
      <CategorySlide />
      
      <ProductSlide title="Flash sale" api='/user/getnewproducts' />
      <BannerSlider />
      <ProductSlide title="Trending" api='/user/gettrendingproducts' />
      <ProductSlide title="Smart phone" api='/user/getproducts?filter=Smart Phone' />
      <MobileNavbar />
    </>
  )
}

export default Landing