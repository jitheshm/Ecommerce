import React from 'react'
import VarientForm from '../components/VarientForm/VarientForm'
import { useParams } from 'react-router-dom'

function EditVarient() {
    const {id} = useParams()
    return (
        <>
            <VarientForm  title="Edit varient details" api="/admin/updatevarient" method="patch" btnName="Update Varient" id={id} />
        </>
    )
}

export default EditVarient