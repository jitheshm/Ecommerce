import React, { useState } from 'react'
import CategoryForm from '../components/CategoryForm/CategoryForm'

function AddCategory() {

  return (
    <>
      <CategoryForm api={'/admin/addcategory'} method={'post'} title="Enter category details" btnName="Add category" />
    </>
  )
}

export default AddCategory