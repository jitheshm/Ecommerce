import React from 'react'
import BannerForm from '../components/BannerForm/BannerForm'

function AddBanner() {
    return (
        <BannerForm title={'Add Banner'} btnName={"Submit"} method={'post'} api={'/admin/banners'}/>
    )
}

export default AddBanner