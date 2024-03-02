import React from 'react'
import Header from '../components/Header/Header'
import ProductSlide from '../components/ProductSlide/ProductSlide'
import MobileNavbar from '../components/mobile/Navbar'
function Landing() {
  return (
   <>
   <Header/>
   
   <ProductSlide title="Flash sale" />
   <ProductSlide title="Trending"/>
   <ProductSlide title="Smart phone"/>
   <MobileNavbar />
   </>
  )
}

export default Landing