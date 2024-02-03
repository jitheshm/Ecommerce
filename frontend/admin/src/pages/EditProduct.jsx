import React from 'react'
import ProductForm from '../components/ProductForm/ProductForm'
import { useParams } from 'react-router-dom'  

function EditProduct() {
    
    const {id} = useParams()

    return (
        <ProductForm  title="Edit product details" api="/admin/updateproduct" method="patch" btnName="Update Product" id={id} />
    )
}

export default EditProduct