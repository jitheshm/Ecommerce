import React from 'react'
import Header from '../components/Header/Header'
import ProductSlide from '../components/ProductSlide/ProductSlide'

function Landing() {
  return (
   <>
   <Header/>
   
   <ProductSlide title="Flash sale" />
   <ProductSlide title="Trending"/>
   <ProductSlide title="Smart phone"/>
  
   </>
  )
}

export default Landing