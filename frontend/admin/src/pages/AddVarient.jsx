import React, { useState } from 'react'
import VarientForm from '../components/VarientForm/VarientForm'
import { useParams } from 'react-router-dom'

function AddVarient() {
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [cost, setCost] = useState(0)
    const [color, setColor] = useState("")
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [imagePre1, setImagePre1] = useState(null)
    const [imagePre2, setImagePre2] = useState(null)
    const [imagePre3, setImagePre3] = useState(null)
    const [imagePre4, setImagePre4] = useState(null)
    const {proId} = useParams()
    const props={
        stock,
        setStock,
        price,
        setPrice,
        cost,
        setCost,
        color,
        setColor,
        image1,
        setImage1,
        image2,
        setImage2,
        image3,
        setImage3,
        image4,
        setImage4,
        imagePre1,
        setImagePre1,
        imagePre2,
        setImagePre2,
        imagePre3,
        setImagePre3,
        imagePre4,
        setImagePre4,
        method:'post',
        api:'/admin/addvarient',
        proId
    }
    return (
        <>
            <VarientForm  {...props}/>
        </>
    )
}

export default AddVarient