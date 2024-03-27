import React, { useState } from 'react'
import CategoryForm from '../components/CategoryForm/CategoryForm'

function AddCategory() {

  return (
    <>
      <CategoryForm api={'/admin/categories'} method={'post'} title="Enter category details" btnName="Add category" />
    </>
  )
}

export default AddCategory