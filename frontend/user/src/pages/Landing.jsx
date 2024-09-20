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
      
      <ProductSlide title="Flash sale" api='/user/products/latest' />
      <BannerSlider />
      <ProductSlide title="Trending" api='/user/products/trending' />
      <ProductSlide title="Smart phone" api='/user/products?filter=Smart Phone' />
      <MobileNavbar />
    </>
  )
}

export default Landing