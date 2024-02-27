import React from 'react'
import OfferForm from '../components/offerForm/offerForm'
import { useParams } from 'react-router-dom'
function EditOffer() {
    const { id } = useParams()
    return (
        <OfferForm btnName={'Update Offer'} title={'Edit Offer'} api={'/admin/updateoffer'} method={'patch'} id={id} />
    )
}

export default EditOffer