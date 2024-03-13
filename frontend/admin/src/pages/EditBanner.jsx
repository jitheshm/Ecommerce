import React from 'react'
import BannerForm from '../components/BannerForm/BannerForm'
import { useParams } from 'react-router-dom'

function EditBanner() {
    const { id } = useParams()
    return (
        <BannerForm title={'Edit Banner'} btnName={"Submit"} method={'patch'} api={'/admin/updatebanner'} id={id}/>
    )
}

export default EditBanner