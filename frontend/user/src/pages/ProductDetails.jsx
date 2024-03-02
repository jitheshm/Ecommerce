import React from 'react'
import Header from '../components/Header/Header'
import ProductDetailsComponent from '../components/ProductDetails/ProductDetails'
import MobileNavbar from '../components/mobile/Navbar'
function ProductDetails() {
    return (
        <>
            <Header />
            <ProductDetailsComponent />
            <MobileNavbar />
        </>
    )
}

export default ProductDetails