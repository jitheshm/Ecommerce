import React from 'react'
import OfferForm from '../components/offerForm/offerForm'

function AddOffer() {
    return (
        <>
            <OfferForm btnName={'Add Offer'} title={'Create new Offer'} api={'/admin/addoffer'} method={'post'}/>
        </>
    )
}

export default AddOffer