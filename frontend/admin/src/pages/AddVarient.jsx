import React, { useState } from 'react'
import VarientForm from '../components/VarientForm/VarientForm'
import { useParams } from 'react-router-dom'

function AddVarient() {
    
    const {proId} = useParams()
    const props = {
        api: '/admin/products/variants',
        method: 'post',
        title: "Enter varient details",
        btnName: "Add varient",
        proId: proId
    }
    return (
        <>
            <VarientForm  {...props}/>
        </>
    )
}

export default AddVarient