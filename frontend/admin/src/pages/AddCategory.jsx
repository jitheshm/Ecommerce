import React, { useState } from 'react'
import CategoryForm from '../components/CategoryForm/Category'

function AddCategory() {
    const [category, setCategory] = useState("")
  return (
    <>
        <CategoryForm category={category} setCategory={setCategory} api={'/admin/addcategory'} method={'post'} title="Enter category details" btnName="Add category"/>
    </>
  )
}

export default AddCategory